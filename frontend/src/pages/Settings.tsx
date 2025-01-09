import GoBackButton from "../components/GoBackButton";
import SettingsContent from "../components/settings/SettingsContent";

export default function Settings() {
  return (
    <div className="settingsPage">
      <div id="GoBackBtn">
        <GoBackButton />
      </div>
      <h1>Settings</h1>
      <SettingsContent />
    </div>
  );
}
