import { PopulatedUser } from "../../types/users";

interface ProfileContentProps {
  user: PopulatedUser;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="profile">
      <h2>{user.username}</h2>
      <p>Notes: {user.notes.length}</p>
      <p>Collections: {user.collections ? user.collections.length : "0"}</p>
    </div>
  );
}
