import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import ManageBooking from "./pages/ManageBooking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/authStore";

function RequireAuth({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/panel/ingresar" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Shop />} />
        <Route path="/tienda/checkout" element={<Checkout />} />
        <Route path="/tienda/:id" element={<ProductDetail />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/turnos" element={<Booking />} />
        <Route path="/turnos/gestionar" element={<ManageBooking />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/panel/ingresar" element={<AdminLogin />} />
      <Route
        path="/panel"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
