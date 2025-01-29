import axios from "axios";
import { Collection, NewCollection } from "../types/collections.ts";

const baseUrl = "/api/collections";

let authToken: string;

const setToken = (newToken: string) => {
  authToken = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.get<Collection[]>(baseUrl, config);
  return response.data;
};

const getOne = async (id: string) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.get<Collection>(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (collection: NewCollection) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.post<Collection>(baseUrl, collection, config);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const update = async (collection: Collection) => {
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.put(
    `${baseUrl}/${collection.id}`,
    collection,
    config,
  );
  return response.data;
};

export default { setToken, getAll, getOne, create, remove, update };
