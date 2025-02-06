import GoBackButton from "../../components/general/GoBackButton";
import SettingsContent from "../../components/settings/SettingsContent";

export default function Settings() {
  return (
    <div className="settingsPage">
      <GoBackButton route="/dashboard" text="Back to Dashboard" />
      <h1>Settings</h1>
      <SettingsContent />
    </div>
  );
}
