import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  // { index: true, element: <Dashboard /> },
  // { path: "/", element: <Navigate replace to="/dashboard" /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // { path: "/dashboard", element: <Dashboard /> },
      { path: "/bookings", Component: Bookings },
      { path: "/cabins", Component: Cabins },
      { path: "/users", Component: Users },
      { path: "/settings", Component: Settings },
      { path: "/account", Component: Account },
    ],
  },
  { path: "/login", Component: Login },
  { path: "*", Component: PageNotFound },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
