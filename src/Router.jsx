import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Earning from "./pages/earning/Earning";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CheckEmail from "./pages/auth/CheckEmail";
import SetPassword from "./pages/auth/SetPassword";
import Verify from "./pages/auth/Verify_user";
import SuccessReset from "./pages/auth/SucessReset";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManagement from "./pages/UserManagement/UserManagement";
import BusinessManagement from "./pages/BusinessManagement/BusinessManagement";
import OfferReview from "./pages/BusinessManagement/OfferReview";
import Category from "./pages/Category/Category";

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
