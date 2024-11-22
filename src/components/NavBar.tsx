import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [token, setToken] = useState(Cookies.get("token") ?? "");
  const [account, setAccount] = useState(localStorage.getItem("account") ?? "");

  useEffect(() => {
    const updateState = () => {
      const tkn = Cookies.get("token") ?? "";
      setToken(tkn);
      const acc = localStorage.getItem("account") ?? "";
      setAccount(acc);
    };

    window.addEventListener("storage", updateState);

    const intervalId = setInterval(() => {
      updateState();
    }, 1000);

    return () => {
      window.removeEventListener("storage", updateState);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-4 w-full">
      <nav className="flex flex-row flex-wrap justify-between items-center gap-2">
        <div className="flex flex-row gap-2 items-center">
          <Link to="/" className="btn btn-ghost text-lg font-bold">
            StayHealthy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Link to="/services" className="btn btn-ghost">Home</Link>
          {/* <Link to="/about" className="btn btn-ghost">About</Link> */}
          <Link to="/blog" className="btn btn-ghost">Blog</Link>
          <Link to="/reviews" className="btn btn-ghost">Reviews</Link>
          {token ? (
            <>
              <Link to="/services" className="btn btn-ghost">Services</Link>
              {account && JSON.parse(account).name ? (
                <div className="dropdown dropdown-hover">
                  <label tabIndex={0} className="btn btn-ghost capitalize">
                    {JSON.parse(account).name}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile">Your Profile</Link>
                    </li>
                    <li>
                      <Link to="/reports">Your Reports</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
              <Link to="/logout" className="btn btn-ghost">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-ghost">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
