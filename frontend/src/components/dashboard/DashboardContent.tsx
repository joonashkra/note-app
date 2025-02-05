import NotesList from "./notes/NotesList";
import CollectionsList from "./collections/CollectionsList";
import noteService from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collectionService";
import { useState } from "react";

export default function DashboardContent() {
  const { data: notes, isLoading: isLoadingNotes } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

  const { data: collections, isLoading: isLoadingCollections } = useQuery({
    queryFn: () => collectionService.getAll(),
    queryKey: ["collections"],
  });

  const [notesView, setNotesView] = useState(true);

  return (
    <div className="dashboardContent" data-testid="dashboardContent">
      <h1>Dashboard</h1>
      <nav className="dashboardContentNav">
        <a onClick={() => setNotesView(true)} className={notesView ? "active" : ""}>Notes</a>
        <a onClick={() => setNotesView(false)} className={!notesView ? "active" : ""}>Collections</a>
      </nav>
      <div className="dashboardContentContainer">
        <section className={`dashboardContentSection ${notesView ? "active" : ""}`}>
          <h2>Notes</h2>
          <div className="dashboardContentSectionData">
            <NotesList notes={notes} isLoading={isLoadingNotes} layout="full" />
          </div>
        </section>
        <section className={`dashboardContentSection ${!notesView ? "active" : ""}`}>
          <h2>Collections</h2>
          <div className="dashboardContentSectionData">
            <CollectionsList collections={collections} isLoading={isLoadingCollections} />
          </div>
        </section>
      </div>
    </div>
  );
}
