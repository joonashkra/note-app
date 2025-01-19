import axios from "axios";
import { NewUser, User } from "../types/users.ts";

const baseUrl = "/api/users";

let authToken: string;

const setToken = (newToken: string) => {
  authToken = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.get<User[]>(baseUrl, config);
  return response.data;
};

const create = async (credentials: NewUser) => {
  const response = await axios.post<User[]>(baseUrl, credentials);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { create, remove, getAll, setToken };
