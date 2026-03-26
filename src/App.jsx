import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';
import DashboardPage from './pages/DashboardPage';
import CreateTripPage from './pages/CreateTripPage';
import TripDetailsPage from './pages/TripDetailsPage';

function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-trip" element={<CreateTripPage />} />
            <Route path="trip/:tripId" element={<TripDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;
