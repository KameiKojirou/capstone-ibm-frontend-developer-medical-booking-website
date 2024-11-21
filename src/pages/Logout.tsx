import { Title } from "../components/Title"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Title>Logout</Title>
            <button onClick={() => {
                Cookies.remove("token")
                navigate("/")
            }}
            className="btn btn-primary">Logout</button>
        </div>
    )
}