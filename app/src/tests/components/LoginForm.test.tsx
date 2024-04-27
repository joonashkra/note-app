import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import '@testing-library/jest-dom/vitest'

describe('LoginForm', () => {
    it('should render loginform', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const form = screen.getByRole('loginform');
        expect(form).toBeInTheDocument()
    })
})