import NotFound from "../components/general/NotFound";
import GoBackButton from "../components/general/GoBackButton";

export default function Fallback() {
  return (
    <div className="notFoundPage">
      <NotFound text="Page not found" size={100} />
      <GoBackButton route={-1} text="Go back" />
    </div>
  );
}
