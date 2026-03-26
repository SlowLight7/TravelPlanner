import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Calendar, DollarSign, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css'; // Don't forget this!

// Fix for leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CreateTripPage = () => {
    const navigate = useNavigate();
    const { addTrip } = useTrips();

    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: '',
        location: { lat: 51.505, lng: -0.09 }, // Default to London
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.destination || !formData.startDate || !formData.endDate || !formData.budget) return;

        const newTrip = {
            id: crypto.randomUUID(),
            destination: formData.destination,
            startDate: formData.startDate,
            endDate: formData.endDate,
            budget: Number(formData.budget),
            location: formData.location,
            expenses: [],
            packingList: [],
            notes: ''
        };

        addTrip(newTrip);
        navigate('/dashboard');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Plan a New Trip</h1>
                <p className="mt-2 text-slate-600 mb-8">Enter the details of your next adventure.</p>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <div className="space-y-2">
                        <label htmlFor="destination" className="text-sm font-medium text-slate-700">Destination Name</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                required
                                className="w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="e.g. Paris, France"
                                value={formData.destination}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className="text-xs text-slate-500">Pick a location on the map to set coordinates.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="startDate" className="text-sm font-medium text-slate-700">Start Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    required
                                    className="w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="endDate" className="text-sm font-medium text-slate-700">End Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    required
                                    className="w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-slate-700">Total Budget</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                id="budget"
                                name="budget"
                                required
                                min="0"
                                className="w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="0.00"
                                value={formData.budget}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                            Create Trip
                        </button>
                    </div>
                </form>
            </div>

            <div className="h-[400px] lg:h-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    className="h-full w-full z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={formData.location} setPosition={(pos) => setFormData(prev => ({ ...prev, location: pos }))} />
                </MapContainer>
            </div>
        </div>
    );
};

const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default CreateTripPage;
