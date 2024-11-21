import { Link, useNavigate } from "react-router-dom"
import { Title } from "../components/Title"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { addToast } from "../stores/toastStore"

export const Login = () => {
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    // Check for token on initial render
    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            navigate("/") // Navigate to home if token exists
        }
    }, [navigate])

    const SignIn = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const account = localStorage.getItem("account")
        if (account) {
            const acc = JSON.parse(account)
            if (acc.email === email && acc.password === password) {
                Cookies.set("token", "1234", {
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    path: "/",
                    sameSite: "strict",
                    secure: true
                })
                addToast("Login successful", "success", 5000)
                navigate("/") // Navigate to home after successful login
            } else {
                addToast("Invalid email or password", "error", 5000)
            }
        } else {
            addToast("Account not found", "error", 5000)
        }
    }

    return (
        <div>
            <Title>Login</Title>
            <form className="flex flex-col gap-2" onSubmit={SignIn}>
                <span>Are you a new member? <Link to="/register" className="underline">Register</Link></span>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="reset" className="btn btn-ghost">Cancel</button>
            </form>
        </div>
    )
}
