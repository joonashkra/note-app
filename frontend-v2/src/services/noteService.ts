import axios from 'axios'
import { Note, NewNote } from '../types/notes.ts'

const baseUrl = 'http://localhost:3001/api/notes'

let authToken: string

export const setToken = (newToken: string) => {
  authToken = `Bearer ${newToken}`
}

export const getAllNotes = async () => {
    const config = {
        headers: { Authorization: authToken }
    }

    const response = await axios.get<Note[]>(baseUrl, config)
    return response.data
}

export const createNote = async (note: NewNote) => {
    const response = await axios.post<Note[]>(baseUrl, note)
    return response.data
}