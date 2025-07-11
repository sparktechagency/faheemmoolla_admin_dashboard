import { Route, BrowserRouter as Router, Routes } from "react-router-dom";



import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import About from './pages/About';
import BusinessManagement from "./pages/BusinessManagement/BusinessManagement";
import OfferReview from "./pages/BusinessManagement/OfferReview";
import Category from "./pages/Category/Category";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import Payouts from "./pages/Payouts/Payouts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Setting from "./pages/Settings/Settings";
import Support from './pages/Support';
import TermsConditions from "./pages/TermsConditions";
import UserManagement from "./pages/UserManagement/UserManagement";
import Profile from "./pages/UserProfile";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import LoginPage from "./pages/auth/SignIn";
import SuccessReset from "./pages/auth/SucessReset";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";


const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        {/* <Route path="/auth/signup/verify" element={<Verify />} /> */}
        <Route
          path="/auth/login/forgot_password"
          element={<ForgotPassword />}
        />
        <Route path="/auth/login/check_email" element={<CheckEmail />} />
        <Route path="/auth/login/set_password" element={<SetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="business-management">
            <Route index element={<BusinessManagement />} />
            <Route path="offer-review" element={<OfferReview />} />
          </Route>
          <Route path="add-category">
            <Route index element={<Category />} />
          </Route>
          <Route path="earning" element={<Earning />} />
          <Route path="settings">
            <Route index element={<Setting />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notification" element={<Notification />} />
            <Route path="about-us" element={<About />} />
            <Route path="support" element={<Support />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
          </Route>
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
