import NotesList from "./notes/NotesList";
import CollectionsList from "./collections/CollectionsList";
import noteService from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collectionService";

export default function DashboardContent() {
  const { data: notes, isLoading: isLoadingNotes } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

  const { data: collections, isLoading: isLoadingCollections } = useQuery({
    queryFn: () => collectionService.getAll(),
    queryKey: ["collections"],
  });

  return (
    <div className="dashboardOutlet" data-testid="dashboardOutlet">
      <h1>Dashboard</h1>
      <div className="dashboardContent">
        <section className="dashboardContentSection">
          <h2>Notes</h2>
          <div className="dashboardContentSectionData">
            <NotesList notes={notes} isLoading={isLoadingNotes} layout="full" />
          </div>
        </section>
        <section className="dashboardContentSection">
          <h2>Collections</h2>
          <div className="dashboardContentSectionData">
            <CollectionsList
              collections={collections}
              isLoading={isLoadingCollections}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
