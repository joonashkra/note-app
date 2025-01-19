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

  const { data: readMe, isLoading } = useQuery({
    queryFn: getReadMe,
    queryKey: ["readMe"],
  });

  if (isLoading) return <Loading />;

  if (readMe === undefined)
    return <NotFound text="README.md not found" size={24} color="#FFFFFF" />;

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
