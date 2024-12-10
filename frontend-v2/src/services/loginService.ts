import axios from 'axios'
import { NewUser, TokenResponse } from '../types/users.ts'


const baseUrl = 'http://localhost:3001/api/login'

export const login = async (credentials: NewUser) => {
    const response = await axios.post<TokenResponse>(baseUrl, credentials)
    return response.data.token
}