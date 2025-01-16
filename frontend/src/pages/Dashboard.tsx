import { Outlet, useLocation } from "react-router-dom";
import AuthBar from "../components/dashboard/authbar/AuthBar";
import MenuBar from "../components/dashboard/menubar/MenuBar";
import GoBackButton from "../components/general/GoBackButton";

export default function Dashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="dashboardPage">
      <MenuBar />
      <div className="dashboardContainer">
        <AuthBar />
        <div className="dashboardOutlet">
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {!isDashboardRoot && (
              <GoBackButton route={"/dashboard"} text="Back to Dashboard" />
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
