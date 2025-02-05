import { useMutation, useQueryClient } from "@tanstack/react-query";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import { Collection, PopulatedCollection } from "../../../types/collections";
import CollectionNotesList from "./CollectionNotesList";
import SelectNotesToAdd from "./SelectNotesToAdd";
import collectionService from "../../../services/collectionService";
import { useNavigate } from "react-router-dom";
import { useTab } from "../../../hooks/useTab";
import { newCollectionSchema } from "../../../types/schemas";
import { useState } from "react";
import { Note } from "../../../types/notes";

interface UpdateCollectionFormProps {
  collection: PopulatedCollection;
  setErrorMsg: (text: string) => void;
  notes: Note[];
}

export default function UpdateCollectionForm({
  collection,
  setErrorMsg,
  notes,
}: UpdateCollectionFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useTab();

  const collectionNotes = notes?.filter((note) =>
    collection.notes.some((n) => n.id === note.id),
  );

  const [selectedNotes, setSelectedNotes] = useState<Note[]>(collectionNotes);

  const { mutateAsync: updateCollectionMutation } = useMutation({
    mutationFn: (data: Collection) => collectionService.update(data),
    onSuccess: (updatedCollection) => {
      queryClient.setQueryData(["collection"], updatedCollection);
      navigate(-1);
    },
    onError: () => {
      setErrorMsg("Unexpected error when updating collection");
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

    const updatedCollection: Collection = {
      ...parseCollection.data,
      id: collection.id,
      users: collection.users.map((user) => user.id),
    };

    await updateCollectionMutation(updatedCollection);
  };

  const cancelUpdate = () => {
    if (window.confirm("Cancel update? All changes will be lost.")) {
      navigate(-1);
    }
  };

  const removeNoteSelection = (id: string) => {
    setSelectedNotes(selectedNotes.filter((note) => note.id !== id));
  };

  return (
    <form className="collectionForm" onSubmit={handleSubmit}>
      <div className="collectionFormInputFields">
        <div className="collectionFormTextFields">
          <input
            required
            type="text"
            name="title"
            maxLength={25}
            id="titleInput"
            placeholder="Title for collection..."
            defaultValue={collection.title}
          ></input>
          <textarea
            typeof="text"
            name="description"
            maxLength={2500}
            rows={12}
            placeholder="Description and details for collection..."
            defaultValue={collection.description}
          ></textarea>
          <div className="collectionFormNotes">
            <h2>Notes in collection</h2>
            <CollectionNotesList
              notes={selectedNotes}
              removeNoteSelection={removeNoteSelection}
            />
          </div>
        </div>
        <SelectNotesToAdd
          notes={notes}
          selectedNotes={selectedNotes}
          setSelectedNotes={setSelectedNotes}
        />
      </div>
      <div className="noteActionButtons">
        <button
          className="noteActionBtn"
          type="submit"
          data-testid="updateCollectionBtn"
        >
          Update <Check size={20} />
        </button>
        <button className="noteActionBtn" type="button" onClick={cancelUpdate}>
          Cancel <Uncheck size={18} />
        </button>
      </div>
    </form>
  );
}
