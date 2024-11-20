import { Link } from "react-router-dom"
import { Title } from "../components/Title"
import { SubTitle } from "../components/SubTitle"
import { Card } from "../components/Card"

export const Services = () => {
    return (
        <div>
            <Title>Services</Title>
            <p>Love yourself enough to live a healthy lifestyle.</p>
            <div className="flex flex-row flex-wrap justify-between gap-2 [&>a]:btn [&>a]:btn-ghost"> 
                <Card>
                    <SubTitle>Instant Consulation</SubTitle>
                    <Link to="/services/consulation">Instant Consulation</Link>
                </Card>
                <Card>
                    <SubTitle>Book an Appointment</SubTitle>
                    <Link to="/services/appointment">Book an Appointment</Link>
                </Card>
                <Card>
                    <SubTitle>Self Checkup</SubTitle>
                    <Link to="/services/selfcheckup">Self Checkup</Link>
                </Card>
                <Card>
                    <SubTitle>Health Tips & Guidance</SubTitle>
                    <Link to="/services/guidance">Health Tips & Guidance</Link>
                </Card>
            </div>
        </div>
    )
}