import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../pages/Loading";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) navigate("/");
  }, [token, navigate]);

  if (token === undefined) return <Loading />;

  return children;
}
