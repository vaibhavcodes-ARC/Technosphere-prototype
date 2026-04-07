import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Schedule from './pages/Schedule';
import Prizes from './pages/Prizes';
import FAQ from './pages/FAQ';
import Venue from './pages/Venue';
import Sponsors from './pages/Sponsors';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminEvents from './pages/admin/AdminEvents';
import AdminUsers from './pages/admin/AdminUsers';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import AdminMainDashboard from './pages/admin/AdminMainDashboard';
import AdminHeroSection from './pages/admin/AdminHeroSection';
import AdminAboutUs from './pages/admin/AdminAboutUs';
import AdminSponsors from './pages/admin/AdminSponsors';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSectionPlaceholder from './pages/admin/AdminSectionPlaceholder';

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminMainDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/hero"
            element={
              <AdminProtectedRoute>
                <AdminHeroSection />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/about"
            element={
              <AdminProtectedRoute>
                <AdminAboutUs />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/sponsors"
            element={
              <AdminProtectedRoute>
                <AdminSponsors />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/venue"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="Venue CMS" description="Venue management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/faqs"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="FAQ CMS" description="FAQ management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="Contacts CMS" description="Contact management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/organizers"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="Organizers CMS" description="Organizer management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/prizes"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="Prizes CMS" description="Prize management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/footer"
            element={
              <AdminProtectedRoute>
                <AdminSectionPlaceholder title="Footer CMS" description="Footer management UI will be connected here next." />
              </AdminProtectedRoute>
            }
          />

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="prizes" element={<Prizes />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="venue" element={<Venue />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="registrations" element={<AdminRegistrations />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111111',
              color: '#fff',
              border: '1px solid #333',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
