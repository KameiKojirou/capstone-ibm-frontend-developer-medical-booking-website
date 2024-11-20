import { Link } from "react-router-dom"
import { Title } from "../components/Title"

export const Logout = () => {
    return (
        <div>
            <Title>Logout</Title>
            <Link to="/" className="btn btn-primary">Logout</Link>
        </div>
    )
}