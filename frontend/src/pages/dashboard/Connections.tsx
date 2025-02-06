import GoBackButton from "../../components/general/GoBackButton";
import WorkInProgress from "../../components/general/WorkInProgress";

export default function Connections() {
  return (
    <main className="connectionsPage">
      <GoBackButton text="Back to Dashboard" route="/dashboard" />
      <h1>Connections</h1>
      <WorkInProgress />
    </main>
  );
}
