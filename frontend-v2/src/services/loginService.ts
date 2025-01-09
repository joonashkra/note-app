import axios from "axios";
import { NewUser, AuthResponse } from "../types/users.ts";

const baseUrl = "/api/login";

export const login = async (credentials: NewUser) => {
  const response = await axios.post<AuthResponse>(baseUrl, credentials);
  return response.data.auth;
};
