import GoBackButton from "../components/general/GoBackButton";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  return (
    <div className="profilePage">
      <div id="GoBackBtn">
        <GoBackButton route={-1} text="Go Back" />
      </div>
      <h1>Profile</h1>
      <ProfileContent />
    </div>
  );
}
