import { PopulatedUser } from "../../types/users";

interface ProfileContentProps {
  user: PopulatedUser;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="profile">
      <h1>{user.username}</h1>
      <p>Notes: {user.notes.length}</p>
      <p>
        Collections: {user.noteCollections ? user.noteCollections.length : "0"}
      </p>
    </div>
  );
}
