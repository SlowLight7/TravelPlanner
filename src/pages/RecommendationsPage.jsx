import { MapPin } from 'lucide-react';

const RECOMMENDATIONS = [
    {
        id: 1,
        city: 'Kyoto',
        country: 'Japan',
        description: 'Experience the perfect blend of ancient traditions and modern life. Visit stunning temples, peaceful gardens, and vibrant geisha districts.',
        tags: ['Culture', 'History', 'Food'],
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        city: 'Paris',
        country: 'France',
        description: 'The city of light awaits. Discover world-class art at the Louvre, ascend the Eiffel Tower, and enjoy exquisite pastries in charming cafes.',
        tags: ['Romance', 'Art', 'Gastronomy'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        city: 'Cape Town',
        country: 'South Africa',
        description: 'Where mountains meet two oceans. ascend Table Mountain, visit penguin beaches, and tour world-renowned vineyards.',
        tags: ['Nature', 'Adventure', 'Wine'],
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        city: 'Santorini',
        country: 'Greece',
        description: 'Famous for its dramatic views, stunning sunsets from Oia town, strange eggplant (white), the town of Thira and naturally its very own active volcano.',
        tags: ['Views', 'Relaxation', 'Beach'],
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        city: 'New York',
        country: 'USA',
        description: 'The city that never sleeps. Catch a Broadway show, walk through Central Park, and stand in Time Square.',
        tags: ['Urban', 'Shopping', 'Entertainment'],
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 6,
        city: 'Queenstown',
        country: 'New Zealand',
        description: 'The adventure capital of the world. Bungee jump, jet boat, ski, or just admire the breathtaking Southern Alps.',
        tags: ['Adventure', 'Nature', 'Sports'],
        image: 'https://images.unsplash.com/photo-1507699622177-388898d9903d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
];

const RecommendationsPage = () => {
    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Popular Destinations</h1>
                <p className="mt-2 text-slate-600">Discover your next dream vacation spot curated by travelers.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {RECOMMENDATIONS.map((place) => (
                    <div key={place.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                            <img
                                src={place.image}
                                alt={place.city}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 backdrop-blur-sm shadow-sm">
                                {place.country}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900">{place.city}</h3>
                            </div>

                            <p className="mb-4 h-18 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                {place.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {place.tags.map(tag => (
                                    <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsPage;
