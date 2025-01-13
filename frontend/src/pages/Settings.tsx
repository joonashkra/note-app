import GoBackButton from "../components/general/GoBackButton";
import SettingsContent from "../components/settings/SettingsContent";

export default function Settings() {
  return (
    <div className="settingsPage">
      <div id="GoBackBtn">
        <GoBackButton route={-1} text="Go back" />
      </div>
      <h1>Settings</h1>
      <SettingsContent />
    </div>
  );
}
