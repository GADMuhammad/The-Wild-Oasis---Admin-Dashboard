import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Uploader } from "./data/Uploader";

const router = createBrowserRouter([
  { index: true, element: <Navigate replace to="/dashboard" /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/bookings", Component: Bookings },
      { path: "/bookings/:bookingId", Component: Booking },
      { path: "/checkIn/:bookingId", Component: CheckIn },
      { path: "/cabins", Component: Cabins },
      { path: "/users", Component: Users },
      { path: "/settings", Component: Settings },
      { path: "/account", Component: Account },
    ],
  },
  { path: "/login", Component: Login },
  { path: "*", Component: PageNotFound },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
  // defaultOptions: { queries: { staleTime: 0 } },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 9000 },
            // prettier-ignore
            style: { fontSize: "18px", maxWidth: "500px", padding: "16px 24px", backgroundColor: 'var(--color-grey-0)', color: 'var(--color-grey-700)' },
          }}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
