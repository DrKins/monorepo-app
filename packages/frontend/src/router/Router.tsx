import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../error/Error";
import Home from "../home/Home";
import Login from "../login/Login";
import Register from "../registration/Registration";
import AnimatedLayout from "./AnimatedLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route key={location.pathname} element={<App />}>
      <Route
        key={location.pathname}
        path="/"
        element={
          <AnimatedLayout>
            <Home />
          </AnimatedLayout>
        }
      />
      <Route
        index
        key={location.pathname}
        path="/register"
        element={
          <AnimatedLayout>
            <Register />
          </AnimatedLayout>
        }
      />
      <Route
        index
        key={location.pathname}
        path="/login"
        element={
          <AnimatedLayout>
            <Login />
          </AnimatedLayout>
        }
      />
      <Route
        index
        key={location.pathname}
        path="/error"
        element={
          <AnimatedLayout>
            <ErrorPage />
          </AnimatedLayout>
        }
      />
    </Route>,
  ),
);

export default router;
