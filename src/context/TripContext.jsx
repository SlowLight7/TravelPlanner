import { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

export const useTrips = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTrips must be used within a TripProvider');
    }
    return context;
};

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState(() => {
        const savedTrips = localStorage.getItem('travel_planner_trips');
        return savedTrips ? JSON.parse(savedTrips) : [];
    });

    useEffect(() => {
        localStorage.setItem('travel_planner_trips', JSON.stringify(trips));
    }, [trips]);

    const addTrip = (trip) => {
        setTrips((prev) => [...prev, trip]);
    };

    const deleteTrip = (id) => {
        setTrips((prev) => prev.filter((t) => t.id !== id));
    };

    const getTrip = (id) => {
        return trips.find((t) => t.id === id);
    };

    const addExpense = (tripId, expense) => {
        setTrips((prev) =>
            prev.map((t) =>
                t.id === tripId ? { ...t, expenses: [...t.expenses, expense] } : t
            )
        );
    };

    const updatePackingItem = (tripId, itemId, isChecked) => {
        setTrips((prev) =>
            prev.map((t) =>
                t.id === tripId
                    ? {
                        ...t,
                        packingList: t.packingList.map((item) =>
                            item.id === itemId ? { ...item, isChecked } : item
                        ),
                    }
                    : t
            )
        );
    };

    const addPackingItem = (tripId, item) => {
        setTrips((prev) =>
            prev.map((t) =>
                t.id === tripId ? { ...t, packingList: [...t.packingList, item] } : t
            )
        );
    }

    const value = {
        trips,
        addTrip,
        deleteTrip,
        getTrip,
        addExpense,
        updatePackingItem,
        addPackingItem
    };

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
