import { useEffect, useState } from "react";
import noteService from "../../services/noteService";
import { Note } from "../../types/notes";
import NoDataCard from "../NoDataCard";
import NotesList from "../notes/NotesList";
import dummyCollections from "../../dummyData";
import CollectionsList from "../collections/CollectionsList";

export default function DashboardContent() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await noteService.getAll();
        setNotes(notes);
        console.log(notes);
      } catch (error) {
        console.error(error);
      }
    };
    getNotes();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardContent">
        <div className="dashboardContentSection">
          <h2>Notes</h2>
          <div className="dashboardContentSectionData">
            <NotesList notes={notes} />
          </div>
        </div>
        <div className="dashboardContentSection">
          <h2>Collections</h2>
          <div className="dashboardContentSectionData">
            <CollectionsList collections={dummyCollections} />
          </div>
        </div>
      </div>
      <div className="dashboardContentSection">
        <h2>Connections</h2>
        <div className="dashboardContentSectionData">
          <NoDataCard error={false} />
        </div>
      </div>
    </div>
  );
}
