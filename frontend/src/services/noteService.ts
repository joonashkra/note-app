import axios from "axios";
import { Note, NewNote } from "../types/notes.ts";

const baseUrl = "/api/notes";

let authToken: string;

const setToken = (newToken: string) => {
  console.log(`Bearer ${newToken}`);
  authToken = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.get<Note[]>(baseUrl, config);
  return response.data;
};

const getOne = async (id: string) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.get<Note>(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (note: NewNote) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.post<Note>(baseUrl, note, config);
  return response.data;
};

export default { setToken, getAll, getOne, create };
