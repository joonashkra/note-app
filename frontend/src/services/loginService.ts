import axios from "axios";
import { NewUser, AuthResponse } from "../types/users.ts";

const baseUrl = "/api/login";

const login = async (credentials: NewUser) => {
  const response = await axios.post<AuthResponse>(baseUrl, credentials);
  console.log(response.data);
  return response.data;
};

export default { login };
