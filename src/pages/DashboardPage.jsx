import { Link } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Plus, Calendar, MapPin, DollarSign, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

const DashboardPage = () => {
    const { trips, deleteTrip } = useTrips();

    const calculateSpent = (expenses) => {
        return expenses.reduce((acc, curr) => acc + curr.amount, 0);
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Trips</h1>
                    <p className="mt-2 text-slate-600">Manage your upcoming adventures and track your progress.</p>
                </div>
                <Link
                    to="/create-trip"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    Create New Trip
                </Link>
            </div>

            {trips.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-24 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm mb-4">
                        <MapPin className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">No trips planned yet</h3>
                    <p className="mt-1 text-slate-500 max-w-sm">
                        Ready to explore the world? Start by creating your first trip.
                    </p>
                    <Link
                        to="/create-trip"
                        className="mt-6 font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Create your first trip &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip) => {
                        const spent = calculateSpent(trip.expenses);
                        const progress = Math.min((spent / trip.budget) * 100, 100);

                        return (
                            <div key={trip.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{trip.destination}</h3>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (confirm('Are you sure you want to delete this trip?')) deleteTrip(trip.id);
                                            }}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>{format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-1.5 text-slate-600">
                                                    <DollarSign className="h-3.5 w-3.5" />
                                                    Budget Used
                                                </span>
                                                <span className="font-medium text-slate-900">
                                                    {Math.round(progress)}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        progress > 90 ? "bg-amber-500" : "bg-emerald-500"
                                                    )}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 text-right">${spent.toLocaleString()} / ${trip.budget.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/trip/${trip.id}`}
                                    className="flex w-full items-center justify-center border-t border-slate-100 bg-slate-50 p-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                                >
                                    View Details
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
