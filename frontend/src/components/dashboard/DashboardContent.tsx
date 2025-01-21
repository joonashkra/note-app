import NotesList from "./notes/NotesList";
import NotFound from "../general/NotFound";

export default function DashboardContent() {
  return (
    <div className="dashboardOutlet" data-testid="dashboardOutlet">
      <h1>Dashboard</h1>
      <div className="dashboardContent">
        <section className="dashboardContentSection">
          <h2>Notes</h2>
          <div className="dashboardContentSectionData">
            <NotesList />
          </div>
        </section>
        <section className="dashboardContentSection">
          <h2>Collections</h2>
          <div className="dashboardContentSectionData">
            <NotFound text="No collections yet." color={"#FAFAFA"} size={50} />
          </div>
        </section>
      </div>
      <section className="dashboardContentSection">
        <h2>Connections</h2>
        <div className="dashboardContentSectionData">
          <NotFound text="No connections yet." color={"#FAFAFA"} size={50} />
        </div>
      </section>
    </div>
  );
}
