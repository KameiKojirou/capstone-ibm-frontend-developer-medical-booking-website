import { Title } from "../components/Title"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { addToast } from "../stores/toastStore";

export const Logout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Title>Logout</Title>
            <button onClick={() => {
                Cookies.remove("token")
                addToast("Logout successful", "success", 5000)
                navigate("/")
            }}
            className="btn btn-primary">Logout</button>
        </div>
    )
}