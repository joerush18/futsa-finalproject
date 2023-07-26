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
import { Typography } from "@mui/material";

const DashboardRoutes = () => {
  const { futsal } = useCurrentUser();
  if (futsal === undefined || futsal.email === "") {
    return <Typography>Something went wrong.</Typography>;
  }
  if (futsal.status !== STATUS.ACTIVE) {
    return (
      <Routes>
        <Route path="/" element={<OnBoardingClient />} />
      </Routes>
    );
  }

  return (
    <>
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
    </>
  );
};

export default DashboardRoutes;
