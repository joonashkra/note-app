import { useQuery } from "@tanstack/react-query";
import GoBackButton from "../../components/general/GoBackButton";
import ProfileContent from "../../components/profile/ProfileContent";
import { useAuth } from "../../hooks/useAuth";
import userService from "../../services/userService";
import Loading from "../Loading";
import { useState } from "react";
import ErrorMessage from "../../components/general/ErrorMessage";

export default function Profile() {
  const { user } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => user && userService.getOne(user.id),
    queryKey: ["user"],
  });

  if (isLoading) return <Loading />;

  if (isError) setErrorMsg("Unexpected error fetching user data.");

  return (
    <div className="profilePage">
      <GoBackButton route="/dashboard" text="Back to Dashboard" />
      {data && <ProfileContent user={data} />}
      <ErrorMessage text={errorMsg} />
    </div>
  );
}
