import NotFound from "../assets/NotFound";

interface NoDataCardProps {
  error: boolean;
}

export default function NoDataCard({ error }: NoDataCardProps) {
  const text = error
    ? "Unexpected error when fetching documents."
    : "No existing documents found.";

  return (
    <>
      <p>{text}</p>
      <NotFound color={"#FAFAFA"} size={60} />
    </>
  );
}
