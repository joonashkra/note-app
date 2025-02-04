import { Outlet } from "react-router-dom";
import SideBar from "../components/dashboard/sidebar/SideBar";
import TopBar from "../components/dashboard/topbar/TopBar";

export default function Dashboard() {
  return (
    <div className="dashboardPage">
      <SideBar />
      <TopBar />
      <Outlet />
    </div>
  );
}
