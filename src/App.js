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
import PendingAppointments from "./pages/PendingAppointments";
import ApproveAppointments from "./pages/ApproveAppointments";
import CompletedAppointments from "./pages/CompletedAppointments";
import PetsRecord from "./pages/PetsRecord";
import PetRoute from "./pages/PetRoute";
import Records from "./pages/Records";
import Staffs from "./pages/Staffs";

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
            path="/Staffs"
            exact
            element={
              <Protected_route>
                <Staffs />
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
            path="/Records"
            exact
            element={
              <Protected_route>
                <Records />
              </Protected_route>
            }
          />
          <Route
            path="/PetRoute/*"
            exact
            element={
              <Protected_route>
                <PetRoute />
              </Protected_route>
            }
          />
          <Route
            path="/PetsRecord"
            exact
            element={
              <Protected_route>
                <PetsRecord />
              </Protected_route>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
