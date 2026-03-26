import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
    ArrowLeft, Calendar, MapPin, DollarSign, CloudSun,
    CheckCircle2, Circle, Plus, Trash2, Home
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import 'leaflet/dist/leaflet.css';

const TripDetailsPage = () => {
    const { tripId } = useParams();
    const { getTrip, addExpense, addPackingItem, updatePackingItem } = useTrips();
    const trip = getTrip(tripId);
    const [activeTab, setActiveTab] = useState('overview');

    if (!trip) return <Navigate to="/dashboard" />;

    return (
        <div className="pb-12">
            <div className="mb-6 flex items-center gap-4">
                <Link to="/dashboard" className="rounded-full bg-white p-2 text-slate-500 hover:text-slate-900 shadow-sm border border-slate-200 hover:bg-slate-50">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{trip.destination}</h1>
                    <p className="text-slate-500 flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                    </p>
                </div>
            </div>

            <div className="mb-8 border-b border-slate-200">
                <nav className="flex space-x-8" aria-label="Tabs">
                    {['overview', 'budget', 'packing'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize transition-colors",
                                activeTab === tab
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'overview' && <OverviewTab trip={trip} />}
                {activeTab === 'budget' && <BudgetTab trip={trip} addExpense={addExpense} />}
                {activeTab === 'packing' && <PackingTab trip={trip} addPackingItem={addPackingItem} updatePackingItem={updatePackingItem} />}
            </div>
        </div>
    );
};

const OverviewTab = ({ trip }) => {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm h-[400px] overflow-hidden relative z-0">
                    <MapContainer center={[trip.location.lat, trip.location.lng]} zoom={13} className="h-full w-full rounded-xl z-0">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[trip.location.lat, trip.location.lng]}>
                            <Popup>{trip.destination}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-2">Total Budget</h3>
                        <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                            <DollarSign className="h-6 w-6 text-emerald-500" />
                            {trip.budget.toLocaleString()}
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-2">Duration</h3>
                        <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                            <Calendar className="h-6 w-6 text-blue-500" />
                            {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} Days
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                    <h3 className="font-semibold text-blue-100 flex items-center gap-2">
                        <CloudSun className="h-5 w-5" />
                        Weather Forecast
                    </h3>
                    <div className="mt-4">
                        <div className="text-4xl font-bold">24°C</div>
                        <div className="text-blue-100 mt-1">Sunny & Clear</div>
                    </div>
                    <div className="mt-6 flex justify-between text-sm text-blue-100/80 border-t border-blue-400/30 pt-4">
                        <div className="flex flex-col items-center">
                            <span>Mon</span>
                            <span className="font-bold text-white">22°</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Tue</span>
                            <span className="font-bold text-white">24°</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Wed</span>
                            <span className="font-bold text-white">23°</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">Notes</h3>
                    <p className="text-slate-600 text-sm italic">
                        {trip.notes || "No notes added yet."}
                    </p>
                </div>
            </div>
        </div>
    );
};

const BudgetTab = ({ trip, addExpense }) => {
    const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'Food' });

    const totalSpent = trip.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const remaining = trip.budget - totalSpent;
    const categories = ['Accommodation', 'Transport', 'Food', 'Activities', 'Shopping', 'Other'];

    // Aggregate data for chart
    const chartData = trip.expenses.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newExpense.name || !newExpense.amount) return;
        addExpense(trip.id, {
            id: crypto.randomUUID(),
            name: newExpense.name,
            amount: Number(newExpense.amount),
            category: newExpense.category
        });
        setNewExpense({ name: '', amount: '', category: 'Food' });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">Total Spent</div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">${totalSpent.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-slate-500">of ${trip.budget.toLocaleString()} budget</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-medium text-slate-500">Remaining</div>
                        <div className={cn("mt-1 text-2xl font-bold", remaining < 0 ? "text-red-500" : "text-emerald-500")}>
                            ${remaining.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm min-h-[300px] flex flex-col">
                    <h3 className="font-semibold text-slate-900 mb-4">Expense Breakdown</h3>
                    {chartData.length > 0 ? (
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${value}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                            No expenses yet
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4">Add Expense</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-slate-700">Description</label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="e.g. Dinner"
                                value={newExpense.name}
                                onChange={e => setNewExpense({ ...newExpense, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-slate-700">Amount</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="0.00"
                                    value={newExpense.amount}
                                    onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-700">Category</label>
                                <select
                                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={newExpense.category}
                                    onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                            Add Expense
                        </button>
                    </form>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                        {trip.expenses.length === 0 ? (
                            <div className="p-6 text-center text-sm text-slate-500">No transactions recorded.</div>
                        ) : (
                            [...trip.expenses].reverse().map(expense => (
                                <div key={expense.id} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50">
                                    <div>
                                        <div className="font-medium text-slate-900">{expense.name}</div>
                                        <div className="text-xs text-slate-500">{expense.category}</div>
                                    </div>
                                    <div className="font-medium text-slate-900">-${expense.amount.toLocaleString()}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PackingTab = ({ trip, addPackingItem, updatePackingItem }) => {
    const [newItem, setNewItem] = useState('');

    const packedCount = trip.packingList.filter(i => i.isChecked).length;
    const totalCount = trip.packingList.length;
    const progress = totalCount === 0 ? 0 : (packedCount / totalCount) * 100;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        addPackingItem(trip.id, {
            id: crypto.randomUUID(),
            item: newItem,
            isChecked: false
        });
        setNewItem('');
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="rounded-xl bg-indigo-600 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Packing Progress</h3>
                    <span className="font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-indigo-900/30">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2 text-sm text-indigo-100">{packedCount} out of {totalCount} items packed</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="border-b border-slate-100 p-4 bg-slate-50">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Add item to pack..."
                            value={newItem}
                            onChange={e => setNewItem(e.target.value)}
                        />
                        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                </form>

                <div className="max-h-[500px] overflow-y-auto">
                    {trip.packingList.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <CheckCircle2 className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                            <p>Your packing list is empty.</p>
                        </div>
                    ) : (
                        trip.packingList.map(item => (
                            <div key={item.id} className="flex items-center gap-3 border-b border-slate-50 px-6 py-4 last:border-0 hover:bg-slate-50">
                                <button
                                    onClick={() => updatePackingItem(trip.id, item.id, !item.isChecked)}
                                    className={cn("flex-shrink-0 transition-colors", item.isChecked ? "text-emerald-500" : "text-slate-300 hover:text-slate-400")}
                                >
                                    {item.isChecked ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                </button>
                                <span className={cn("flex-1 text-sm font-medium", item.isChecked ? "text-slate-400 line-through" : "text-slate-900")}>
                                    {item.item}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripDetailsPage;
