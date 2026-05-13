import { Navigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!isAuthenticated && !isPending) return <Navigate to="/login" replace />;
  if (isAuthenticated) return children; // the children is the application itself.
  return null;
}
