import axios from "axios";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Account from "./pages/Account";
import BookingPlace from "./pages/BookingPlace";
import IndexPage from "./pages/IndexPage";
import LogInPage from "./pages/LogInPage";
import PlaceForm from "./pages/PlaceForm";
import PlacePage from "./pages/PlacePage";
import RegisterPage from "./pages/RegisterPage";
import { useNavigate } from "react-router";
import PlaceDetailsPage from "./pages/PlaceDetails";
import BookingDetails from "./pages/BookingDetails";
export default function App() {
  const { token } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.baseURL = "http://localhost:5252";

  return (
    <Routes>
      <Route path="/login" replace={true} element={<LogInPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={token ? <IndexPage /> : <LogInPage />}></Route>
        <Route
          path="/place/:id"
          element={token ? <PlaceDetailsPage /> : <LogInPage />}
        ></Route>

        <Route
          path="/account"
          element={token ? <Account /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/places"
          element={token ? <PlacePage /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/places/:id"
          element={token ? <PlacePage /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/booking"
          element={token ? <BookingPlace /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/bookings/:id"
          element={token ? <BookingDetails /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/places/new"
          element={token ? <PlaceForm /> : <LogInPage />}
        ></Route>
        <Route
          path="/account/places/update/:id"
          element={token ? <PlaceForm /> : <LogInPage />}
        ></Route>
      </Route>
    </Routes>
  );
}
