import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import '@testing-library/jest-dom/vitest'
import { User, createUserWithEmailAndPassword, deleteUser, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Auth', async () => {

    const email = "auth-test@testemail.com"
    const password = "testPassword123"

    afterEach(async () => {
        vi.restoreAllMocks()
        const user = auth.currentUser;
        try {
            await deleteUser(user as User)
        } catch (error) {
            console.error(error)
        }
    })

    await createUserWithEmailAndPassword(auth, email, password)
    await signOut(auth)

    it('should show error with wrong credentials', async () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const emailField = screen.getByPlaceholderText("Email...")
        const passwordField = screen.getByPlaceholderText("Password...")
        const loginBtn = screen.getByRole("loginBtn")

        fireEvent.change(emailField, {target: {value: 'wrong@email.com'}})
        fireEvent.change(passwordField, {target: {value: 'wrongPassword'}})
        fireEvent.click(loginBtn)

        await waitFor(() => {
            expect(mockedUseNavigate).not.toHaveBeenCalled()
            expect(screen.queryByRole("errorMsg")).toBeInTheDocument()
            expect(auth.currentUser).toBeNull()
        })
    })

    it('should log in with correct credentials', async () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const emailField = screen.getByPlaceholderText("Email...")
        const passwordField = screen.getByPlaceholderText("Password...")
        const loginBtn = screen.getByRole("loginBtn")

        fireEvent.change(emailField, {target: {value: email}})
        fireEvent.change(passwordField, {target: {value: password}})
        fireEvent.click(loginBtn)

        await waitFor(() => {
            expect(mockedUseNavigate).toHaveBeenCalledWith("/")
            expect(auth.currentUser).not.toBeNull()
        })
    })

})