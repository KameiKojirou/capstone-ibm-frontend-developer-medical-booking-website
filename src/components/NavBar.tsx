import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export const NavBar = () => {
    const [token, setToken] = useState("")
    const [account, setAccount] = useState("")

    useEffect(() => {
        const tkn = Cookies.get("token")
        if (tkn) {
            setToken(tkn)
        }
        const acc = localStorage.getItem("account")
        if (acc) {
            setAccount(acc)
        }
    }, []) // Empty dependency array ensures this runs only on mount

    return (
        <div className="p-4 w-full">
            <nav className="flex flex-row flex-wrap justify-between gap-2 [&>a]:btn [&>a]:btn-ghost">
                <div className="flex flex-row gap-2 [&>a]:btn [&>a]:btn-ghost">
                    <Link to="/">StayHealthy 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </Link>
                </div>
                <div className="flex flex-row gap-2 [&>a]:btn [&>a]:btn-ghost">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/reviews">Reviews</Link>
                    {token ? 
                    <>
                        <Link to="/services">Services</Link>
                        {account && JSON.parse(account).name ? <Link to="/services" className="btn btn-ghost capitalize">{JSON.parse(account).name}</Link> : null}
                        <Link to="/logout">Logout</Link>
                    </>
                     : <>
                        <Link to="/login">Login</Link> 
                        <Link to="/register">Register</Link>
                    </>}
                </div>
            </nav>
        </div>
    )
}
