import { useQuery } from "@tanstack/react-query";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import Loading from "./Loading";
import NotFound from "../components/general/NotFound";

export default function Home() {
  const getReadMe = async () => {
    const response = await axios.get("/api/readme");
    return response.data;
  };

  const {
    data: readMe,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getReadMe,
    queryKey: ["readMe"],
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <NotFound text="Failed to fetch README.md" size={60} color="#FFFFFF" />
    );

  const styles = {
    padding: "4rem 8rem",
    backgroundColor: "var(--black)",
  };

  return (
    <main className="homePage" data-testid="homePage">
      <MarkdownPreview source={readMe} style={styles} />
    </main>
  );
}
