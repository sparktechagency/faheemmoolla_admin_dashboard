import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import SuccessReset from "./pages/auth/SucessReset";
import Verify from "./pages/auth/Verify_user";
import BusinessManagement from "./pages/BusinessManagement/BusinessManagement";
import OfferReview from "./pages/BusinessManagement/OfferReview";
import Category from "./pages/Category/Category";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import Payouts from "./pages/Payouts/Payouts";
import PrivacyPolicy from "./pages/privacyPolicy";
import Settings from "./pages/Settings/Settings";
import TermsConditions from "./pages/TermsConditions";
import UserManagement from "./pages/UserManagement/UserManagement";
import UserProfile from "./pages/UserProfile";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        <Route path="/auth/signup/verify" element={<Verify />} />
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
            <Route index element={<Settings />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="notification" element={<Notification />} />
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
