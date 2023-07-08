import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import HomePage from "@/pages/dashboard/HomePage";
import BookingPage from "@/pages/dashboard/BookingPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import NewsPage from "@/pages/dashboard/NewsPage";
import EventsPage from "@/pages/dashboard/EventsPage";
import PaymentPage from "@/pages/dashboard/PaymentPage";
import OnBoardingClient from "@/pages/auth/onboarding/OnBoardingClient";
import useCurrentUser from "@/hooks/useCurrentUser";
import { STATUS } from "core/src/types/futsals.types";

const DashboardRoutes = () => {
  const { futsal, isAuth } = useCurrentUser();
  if (!futsal || !isAuth) {
    return null;
  }
  if (futsal.status !== STATUS.ACTIVE) {
    return (
      <Routes>
        <Route path="/" element={<OnBoardingClient />} />
      </Routes>
    );
  }

  if (futsal.status === STATUS.ACTIVE) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<HomePage />} />
          <Route path="bookings" element={<BookingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="payments" element={<PaymentPage />} />
        </Route>
      </Routes>
    );
  }
  return null;
};

export default DashboardRoutes;
