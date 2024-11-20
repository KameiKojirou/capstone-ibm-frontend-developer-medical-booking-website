import { Link } from "react-router-dom"
import { Title } from "../components/Title"

export const Login = () => {
    return (
        <div>
            <Title>Login</Title>
            <form className="flex flex-col gap-2">
                <span>Are you a new member? <Link to="/register" className="underline">Register</Link></span>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="input input-bordered" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="input input-bordered" />
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="reset" className="btn btn-ghost">Cancel</button>
            </form>
        </div>
    )
}