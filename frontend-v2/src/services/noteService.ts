import axios from 'axios'
import { Note, NewNote } from '../types/notes.ts'

const baseUrl = '/api/notes'

let authToken: string

const setToken = (newToken: string) => {
    console.log("newToken: ", newToken)
  authToken = `Bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: authToken }
    }

    const response = await axios.get<Note[]>(baseUrl, config)
    return response.data
}

const create = async (note: NewNote) => {
    const response = await axios.post<Note[]>(baseUrl, note)
    return response.data
}

export default { setToken, getAll, create }