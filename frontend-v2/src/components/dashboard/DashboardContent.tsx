import { useState } from "react"
import NotFound from "../../assets/NotFound"
import { COLORS } from "../../colors"

export default function DashboardContent() {


  const [notes, setNotes] = useState([]);

  return (
    <div className="dashboardContent">
      <h1>Dashboard</h1>
      <div className="dashboardContentSection">
        <h2>Collections</h2>
        <div className="dashboardContentSectionData">
          <p>No existing collections.</p>
          <NotFound color={COLORS.white} size={60} />
        </div>
      </div>
      <div className="dashboardContentSection">
        <h2>Notes</h2>
        <div className="dashboardContentSectionData">
          <p>No existing notes.</p>
          <NotFound color={COLORS.white} size={60} />
        </div>
      </div>
      <div className="dashboardContentSection">
        <h2>Connections</h2>
        <div className="dashboardContentSectionData">
          <p>No connections found.</p>
          <NotFound color={COLORS.white} size={60} />
        </div>
      </div>
      </div>
  )
}
