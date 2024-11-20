import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="p-4 w-full">
            <nav className="flex flex-row flex-wrap justify-between gap-2 [&>a]:btn [&>a]:btn-ghost">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
        </div>
    )
}