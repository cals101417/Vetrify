import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/context/UserAuthContext";
import Unprotected_route from "../src/auth/context/Unprotected_route";
import Protected_route from "../src/auth/context/Protected_route";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import User from "./pages/User";
import Pets from "./pages/Pets";
import About from "./pages/About";
import History from "./pages/History";
import PendingAppointments from "./pages/Appointments/PendingAppointments";
import ApproveAppointments from "./pages/Appointments/ApproveAppointments";
import CompletedAppointments from "./pages/Appointments/CompletedAppointments";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Unprotected_route>
                <Login />
              </Unprotected_route>
            }
          />
          <Route
            path="/Register"
            exact
            element={
              <Unprotected_route>
                <Register />
              </Unprotected_route>
            }
          />
          <Route
            path="/Home"
            exact
            element={
              <Protected_route>
                <Home />
              </Protected_route>
            }
          />
          <Route
            path="/Users"
            exact
            element={
              <Protected_route>
                <User />
              </Protected_route>
            }
          />
          <Route
            path="/PendingAppointments"
            exact
            element={
              <Protected_route>
                <PendingAppointments />
              </Protected_route>
            }
          />
          <Route
            path="/ApproveAppointments"
            exact
            element={
              <Protected_route>
                <ApproveAppointments />
              </Protected_route>
            }
          />
          <Route
            path="/CompletedAppointments"
            exact
            element={
              <Protected_route>
                <CompletedAppointments />
              </Protected_route>
            }
          />

          <Route
            path="/About"
            exact
            element={
              <Protected_route>
                <About />
              </Protected_route>
            }
          />
          <Route
            path="/History"
            exact
            element={
              <Protected_route>
                <History />
              </Protected_route>
            }
          />
          <Route
            path="/Pets/:petID"
            exact
            element={
              <Protected_route>
                <Pets />
              </Protected_route>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
