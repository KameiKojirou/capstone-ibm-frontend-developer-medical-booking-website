import { Link } from "react-router-dom"
import { Title } from "../components/Title"
import { SubTitle } from "../components/SubTitle"
import { Card } from "../components/Card"

export const Services = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 text-center justify-center">
                <Title>Services</Title>
                <p>Love yourself enough to live a healthy lifestyle.</p>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-8 [&>a]:btn [&>a]:btn-ghost [&>a]:h-auto [&>a]:p-4">
                <Link to="/services/consultation">
                    <Card>
                        <SubTitle>Instant Consulation</SubTitle>
                        <img src="./images/services/consultation.webp" alt="Instant Consulation" />
                    </Card>
                </Link>
                <Link to="/services/appointment">
                    <Card>
                        <SubTitle>Book an Appointment</SubTitle>
                        <img src="./images/services/book-appointment.webp" alt="Book an Appointment" />
                    </Card>
                </Link>
                <Link to="/services/selfcheckup">
                    <Card>
                        <SubTitle>Self Checkup</SubTitle>
                        <img src="./images/services/self-checkup.webp" alt="Self Checkup" />
                    </Card>
                </Link>
                <Link to="/services/guidance"> 
                    <Card>
                        <SubTitle>Health Tips & Guidance</SubTitle>
                        <img src="./images/services/guidance.webp" alt="Health Tips & Guidance" />
                    </Card>
                </Link>
            </div>
        </div>
    )
}