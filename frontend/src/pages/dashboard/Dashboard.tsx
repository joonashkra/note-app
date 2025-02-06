import { Outlet } from "react-router-dom";
import TopBar from "../../components/dashboard/topbar/TopBar";
import SideBar from "../../components/dashboard/sidebar/SideBar";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar />
      <TopBar />
      <Outlet />
    </div>
  );
}
