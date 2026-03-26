import { Link, Outlet, useLocation } from 'react-router-dom';
import { Map, LayoutDashboard, Home as HomeIcon, Compass } from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { href: '/', label: 'Home', icon: HomeIcon },
        { href: '/recommendations', label: 'Explore', icon: Compass },
        { href: '/dashboard', label: 'My Trips', icon: LayoutDashboard },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between px-4 max-w-5xl mx-auto">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
                        <Map className="h-6 w-6" />
                        <span>TravelPlanner</span>
                    </Link>

                    <nav className="flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600",
                                        isActive ? "text-blue-600" : "text-slate-600"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden sm:inline-block">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/dashboard"
                            className="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>

            <footer className="border-t bg-white py-6">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-10 md:flex-row px-4 max-w-5xl mx-auto">
                    <p className="text-center text-sm leading-loose text-slate-500 md:text-left">
                        Built for travelers. 2026 TravelPlanner.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
