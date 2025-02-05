import { useNavigate } from "react-router-dom";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewCollection } from "../../../types/collections";
import collectionService from "../../../services/collectionService";
import { newCollectionSchema } from "../../../types/schemas";
import { useState } from "react";
import { Note } from "../../../types/notes";
import SelectNotesToAdd from "./SelectNotesToAdd";
import CollectionNotesList from "./CollectionNotesList";

interface CreateCollectionFormProps {
  setErrorMsg: (text: string) => void;
  notes: Note[];
}

export default function CreateCollectionForm({
  setErrorMsg,
  notes,
}: CreateCollectionFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const { mutateAsync: addCollectionMutation } = useMutation({
    mutationFn: (newCollection: NewCollection) =>
      collectionService.create(newCollection),
    onSuccess: (createdCollection) => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
      navigate(`/dashboard/collections/${createdCollection.id}`);
    },
    onError: () => {
      setErrorMsg("Unexpected error when creating the note");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    const parseCollection = newCollectionSchema.safeParse({
      ...formValues,
      notes: selectedNotes.map((note) => note.id),
    });

    if (!parseCollection.success) {
      console.error(parseCollection.error);
      setErrorMsg(`Error: ${parseCollection.error.issues[0].message}`);
      return;
    }

    const newCollection = parseCollection.data;

    await addCollectionMutation(newCollection);
  };

  const cancelCreate = () => {
    if (window.confirm("Cancel? All changes will be lost.")) {
      navigate("/dashboard");
    }
  };

  const removeNoteSelection = (id: string) => {
    setSelectedNotes(selectedNotes.filter((note) => note.id !== id));
  };

  const [overview, setOverview] = useState(true);

  return (
    <form className="collectionForm" onSubmit={handleSubmit}>
      <nav className="collectionFormNav">
        <a
          onClick={() => setOverview(true)}
          className={overview ? "active" : ""}
        >
          Overview
        </a>
        <a
          onClick={() => setOverview(false)}
          className={!overview ? "active" : ""}
        >
          Notes
        </a>
      </nav>
      <div className="collectionFormInputFields">
        <div className={`collectionFormTextFields ${overview ? "active" : ""}`}>
          <input
            required
            type="text"
            name="title"
            maxLength={25}
            id="titleInput"
            placeholder="Title for collection..."
          ></input>
          <textarea
            typeof="text"
            name="description"
            maxLength={2500}
            rows={12}
            placeholder="Description and details for collection..."
          ></textarea>
        </div>
        <div
          className={`collectionFormAddProperties ${!overview ? "active" : ""}`}
        >
          <SelectNotesToAdd
            notes={notes}
            selectedNotes={selectedNotes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
      </div>
      <div className={`collectionFormNotes ${!overview ? "active" : ""}`}>
        <h2>Notes for collection</h2>
        <CollectionNotesList
          notes={selectedNotes}
          removeNoteSelection={removeNoteSelection}
        />
      </div>
      <div className="noteActionButtons">
        <button className="noteActionBtn" type="submit">
          Create <Check size={20} />
        </button>
        <button className="noteActionBtn" type="button" onClick={cancelCreate}>
          Cancel <Uncheck size={18} />
        </button>
      </div>
    </form>
  );
}
