import { PropsWithChildren } from "react";
import { useAuth } from "../../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();

  if (token === undefined) return <div>Loading...</div>;

  if (token === null) return <div>Restricted</div>;

  return children;
}
