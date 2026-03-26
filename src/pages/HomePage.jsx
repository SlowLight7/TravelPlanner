import { Link } from 'react-router-dom';
import { Plane, Wallet, CheckSquare, ArrowRight, MapPin } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col gap-16 pb-10">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-24 sm:px-12 sm:py-32 text-center text-white shadow-xl">
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center gap-6">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Plan your next adventure with confidence
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
                        Organize trips, manage budgets, and pack smarter. The all-in-one travel companion for modern explorers.
                    </p>
                    <div className="mt-4">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            Start Planning
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="mx-auto max-w-5xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need</h2>
                    <p className="mt-4 text-lg text-slate-600">Simplify your travel experience with our powerful tools.</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Wallet className="h-8 w-8 text-blue-600" />}
                        title="Smart Budgeting"
                        description="Track expenses in real-time. Visualize your spending with charts and never go over budget again."
                    />
                    <FeatureCard
                        icon={<MapPin className="h-8 w-8 text-indigo-600" />}
                        title="Interactive Maps"
                        description="Pin locations, plan routes, and explore destinations with integrated interactive maps."
                    />
                    <FeatureCard
                        icon={<CheckSquare className="h-8 w-8 text-emerald-600" />}
                        title="Packing Lists"
                        description="Stay organized with smart checklists. Ensure you never forget the essentials for your trip."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
            {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

export default HomePage;
