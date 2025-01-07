import { Outlet, useLocation } from "react-router-dom";
import AuthBar from "../components/dashboard/authbar/AuthBar";
import MenuBar from "../components/dashboard/menu/MenuBar";
import GoBackButton from "../components/GoBackButton";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  const { token, user } = useAuth();

  console.log("token: ", token)
  console.log("user: ", user)

  return (
    <div className="dashboardPage">
      <MenuBar />
      <div className="dashboardContainer">
        <AuthBar />
        <div className="dashboard">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {!isDashboardRoot && (
              <GoBackButton />
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
