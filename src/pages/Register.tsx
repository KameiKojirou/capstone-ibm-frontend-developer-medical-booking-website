import { Link } from "react-router-dom"
import { Title } from "../components/Title"

export const Register = () => {
    return (
        <div>
            <Title>Register</Title>
            <form className="flex flex-col gap-2">
            <span>Already have an account? <Link to="/login" className="underline">Login</Link></span>
                <label htmlFor="role">Role</label>
                <select name="role" id="role" className="select select-bordered">
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="input input-bordered" />
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" className="input input-bordered" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="input input-bordered" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="input input-bordered" />
                <button type="submit" className="btn btn-primary">Register</button>
                <button type="reset" className="btn btn-ghost">Cancel</button>
            </form>
        </div>
    )
}