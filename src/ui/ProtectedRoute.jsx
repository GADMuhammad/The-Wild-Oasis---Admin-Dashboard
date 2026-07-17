import { Navigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9fafb]">
        <Spinner />
      </div>
    );
  if (!isAuthenticated && !isPending) return <Navigate to="/login" replace />;
  if (isAuthenticated) return children; // the children is the application itself.
  return null;
}
