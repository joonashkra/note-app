import axios from 'axios'
import { Note, NewNote } from '../types/notes.ts'

const baseUrl = 'http://localhost:3001/api/notes'

export const getAllNotes = async () => {
    const response = await axios.get<Note[]>(baseUrl)
    return response.data
}

export const createNote = async (note: NewNote) => {
    const response = await axios.post<Note[]>(baseUrl, note)
    return response.data
}