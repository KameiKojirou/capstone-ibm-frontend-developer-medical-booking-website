import { Title } from "../components/Title"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="flex flex-col gap-4 text-center justify-center">
            <Title>Your Health, Our Responsibility</Title>
            <p>Love yourself enough to live a healthy lifestyle.</p>
            <p>This is a fake demo website</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed repellendus repellat asperiores. Voluptate rerum hic reprehenderit magni distinctio quaerat voluptas qui iste a fuga fugiat incidunt beatae culpa quos dolorum vitae, magnam laborum iure. Cum perspiciatis, esse magnam laudantium odit, voluptatum, repudiandae corrupti exercitationem praesentium sequi sed ea voluptates?</p>
            <div className="w-full">
                <Link to="/services" className="btn btn-primary w-1/2"> Get Started</Link>
            </div>
        </div>
    )
}