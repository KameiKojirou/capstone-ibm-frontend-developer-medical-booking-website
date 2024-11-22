import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title"
import { useEffect } from "react";
import Cookies from "js-cookie";

export const YourReports = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
        }
        const acc = localStorage.getItem("account");
        if (!acc) {
            navigate("/register");
        }
    }, [navigate]);
    return (
        <div>
            <Title>Your Reports</Title>
        </div>
    )
}