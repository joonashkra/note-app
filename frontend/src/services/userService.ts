import axios from 'axios'
import { NewUser, User } from '../types/users.ts'

const baseUrl = 'http://localhost:3001/api/users'

export const createUser = async (credentials: NewUser) => {
    const response = await axios.post<User[]>(baseUrl, credentials)
    return response.data
}