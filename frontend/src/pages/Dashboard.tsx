import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/dashboard/sidebar/SideBar";
import GoBackButton from "../components/general/GoBackButton";
import TopBar from "../components/dashboard/topbar/TopBar";

export default function Dashboard() {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="dashboardPage">
      <SideBar />
      <div className="dashboardContainer">
        <TopBar />
        <main className="dashboardMain">
          {!isDashboardRoot && (
            <GoBackButton route={"/dashboard"} text="Back to Dashboard" />
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
