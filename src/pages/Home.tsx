import { Title } from "../components/Title"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="flex flex-col gap-4 text-center justify-center">
            <Title>Your Health, Our Responsibility</Title>
            <p>Love yourself enough to live a healthy lifestyle.</p>
            <div className="w-full">
                <Link to="/services" className="btn btn-primary w-1/2"> Get Started</Link>
            </div>
        </div>
    )
}