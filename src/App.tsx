import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingPage } from '@/components/LoadingSpinner';
import { useDataStore } from '@/stores/data';
import { useAuthStore } from '@/stores/auth';

// Public Pages
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import DestinationDetail from '@/pages/DestinationDetail';
import Packages from '@/pages/Packages';
import Deals from '@/pages/Deals';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';

// Admin Pages
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminDestinations from '@/pages/admin/DestinationsAdmin';
import AdminPackages from '@/pages/admin/PackagesAdmin';
import AdminOrders from '@/pages/admin/OrdersAdmin';

// 404 Page
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <a href="/" className="text-primary hover:underline">
        Go back home
      </a>
    </div>
  </div>
);

// Admin Route Guard
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

function App() {
  const initialize = useDataStore((state) => state.initialize);
  const isLoading = useDataStore((state) => state.isLoading);
  const isInitialized = useDataStore((state) => state.isInitialized);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    initialize();
  }, [initialize, checkAuth]);

  if (isLoading || !isInitialized) {
    return <LoadingPage message="Loading travel destinations..." />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/destinations"
              element={
                <RequireAdmin>
                  <AdminDestinations />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/packages"
              element={
                <RequireAdmin>
                  <AdminPackages />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <RequireAdmin>
                  <AdminOrders />
                </RequireAdmin>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;