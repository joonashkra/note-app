import NotesList from "./notes/NotesList";
import CollectionsList from "./collections/CollectionsList";
import NotFound from "../general/NotFound";

export default function DashboardContent() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardContent">
        <div className="dashboardContentSection">
          <h2>Notes</h2>
          <div className="dashboardContentSectionData">
            <NotesList />
          </div>
        </div>
        <div className="dashboardContentSection">
          <h2>Collections</h2>
          <div className="dashboardContentSectionData">
            <CollectionsList />
          </div>
        </div>
      </div>
      <div className="dashboardContentSection">
        <h2>Connections</h2>
        <div className="dashboardContentSectionData">
          <NotFound text="No connections found" color={"#FAFAFA"} size={60} />
        </div>
      </div>
    </div>
  );
}
