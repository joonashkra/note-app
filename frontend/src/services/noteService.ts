import axios from "axios";
import { Note, NewNote } from "../types/notes.ts";

const baseUrl = "/api/notes";

let authToken: string;

const setToken = (newToken: string) => {
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

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const update = async (note: Note) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.put(`${baseUrl}/${note.id}`, note, config);
  return response.data;
};

export default { setToken, getAll, getOne, create, remove, update };
