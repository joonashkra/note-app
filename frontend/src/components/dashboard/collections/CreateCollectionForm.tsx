import { useNavigate } from "react-router-dom";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewCollection } from "../../../types/collections";
import collectionService from "../../../services/collectionService";
import { newCollectionSchema } from "../../../types/schemas";
import { useState } from "react";
import { Note } from "../../../types/notes";
import AddNotesList from "./AddNotesList";

interface CreateCollectionFormProps {
  setErrorMsg: (text: string) => void;
}

export default function CreateCollectionForm({
  setErrorMsg,
}: CreateCollectionFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [notesToAdd, setNotesToAdd] = useState<Note[]>([]);

  const { mutateAsync: addCollectionMutation } = useMutation({
    mutationFn: (newCollection: NewCollection) =>
      collectionService.create(newCollection),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
      navigate("/dashboard");
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
      notes: notesToAdd.map((note) => note.id),
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
      navigate(-1);
    }
  };

  const removeNoteSelection = (id: string) => {
    setNotesToAdd(notesToAdd.filter((note) => note.id !== id));
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
          ></input>
          <textarea
            typeof="text"
            name="description"
            maxLength={2500}
            rows={12}
            placeholder="Description and details for collection (optional)..."
          ></textarea>
          <div className="collectionFormNotes">
            <label>Notes</label>
            <ul className="noteToAddList">
              {notesToAdd.map((note) => (
                <li key={note.id} className="noteToAdd">
                  {note.title}{" "}
                  <div
                    className="removeSelection"
                    onClick={() => removeNoteSelection(note.id)}
                  >
                    <Uncheck color="#e04343" size={15} />
                  </div>
                </li>
              ))}
              {notesToAdd.length < 1 && <p>No notes yet.</p>}
            </ul>
          </div>
        </div>
        <div className="collectionFormAddProperties">
          <label>Add Existing Notes</label>
          <p style={{ fontSize: "0.8rem", overflow: "auto" }}>
            Notes will be removed from their current collection if added to a
            new one.
          </p>
          <AddNotesList notesToAdd={notesToAdd} setNotesToAdd={setNotesToAdd} />
        </div>
      </div>
      <div className="noteActionButtons">
        <button className="noteActionBtn" type="submit">
          Create <Check size={20} color="#000000" />
        </button>
        <button className="noteActionBtn" type="button" onClick={cancelCreate}>
          Cancel <Uncheck size={18} color="#000000" />
        </button>
      </div>
    </form>
  );
}
