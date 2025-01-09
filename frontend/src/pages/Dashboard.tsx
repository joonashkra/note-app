import { Outlet, useLocation } from "react-router-dom";
import AuthBar from "../components/dashboard/authbar/AuthBar";
import MenuBar from "../components/dashboard/menu/MenuBar";
import GoBackButton from "../components/GoBackButton";

export default function Dashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="dashboardPage">
      <MenuBar />
      <div className="dashboardContainer">
        <AuthBar />
        <div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {!isDashboardRoot && <GoBackButton />}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
