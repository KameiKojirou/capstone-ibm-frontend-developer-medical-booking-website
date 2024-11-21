import { Link, useNavigate } from "react-router-dom"
import { Title } from "../components/Title"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { addToast } from "../stores/toastStore"

export const Register = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState("patient")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            navigate("/")
        }
    }, [navigate])

    const AddAccount = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        localStorage.setItem("account", JSON.stringify({
            role: role,
            name: name,
            phone: phone,
            email: email,
            password: password
        }))
        addToast("Account created successfully", "success", 5000)
        navigate("/login")
    }

    return (
        <div>
            <Title>Register</Title>
            <form className="flex flex-col gap-2" onSubmit={AddAccount}>
                <span>Already have an account? <Link to="/login" className="underline">Login</Link></span>
                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    className="select select-bordered"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="input input-bordered"
                    onChange={(e) => setPhone(e.target.value)}
                />
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
                <button type="submit" className="btn btn-primary">Register</button>
                <button type="reset" className="btn btn-ghost">Cancel</button>
            </form>
        </div>
    )
}
