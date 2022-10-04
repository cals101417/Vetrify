import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./auth/context/UserAuthContext";
import Unprotected_route from "../src/auth/context/Unprotected_route";
import Protected_route from "../src/auth/context/Protected_route";
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
