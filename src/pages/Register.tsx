import { Link, useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { addToast } from "../stores/toastStore";

export const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("patient");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        // Check if all fields are filled and meet their validation criteria
        const isNameValid = name.length >= 3;
        const isPhoneValid = /^[0-9]{10}$/.test(phone); // Ensure phone contains exactly 10 digits
        const isEmailValid = email.includes("@") && email.includes(".");
        const isPasswordValid = password.length >= 8;

        setIsFormValid(isNameValid && isPhoneValid && isEmailValid && isPasswordValid);
    }, [name, phone, email, password]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits
        if (/^\d*$/.test(value)) {
            setPhone(value);
        }
    };

    const AddAccount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem(
            "account",
            JSON.stringify({
                role: role,
                name: name,
                phone: phone,
                email: email,
                password: password,
            })
        );
        addToast("Account created successfully", "success", 5000);
        navigate("/login");
    };

    return (
        <div>
            <Title>Register</Title>
            <form className="flex flex-col gap-2" onSubmit={AddAccount}>
                <span>
                    Already have an account? <Link to="/login" className="underline">Login</Link>
                </span>
                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    className="select select-bordered"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {name.length < 3 && name.length > 0 && (
                    <p className="text-error">Name must be at least 3 characters</p>
                )}
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="input input-bordered"
                    value={phone}
                    onChange={handlePhoneChange}
                />
                {phone.length > 0 && !/^[0-9]{10}$/.test(phone) && (
                    <p className="text-error">Phone must be exactly 10 digits</p>
                )}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {(!email.includes("@") || !email.includes(".")) && email.length > 0 && (
                    <p className="text-error">Email must be valid</p>
                )}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {password.length < 8 && password.length > 0 && (
                    <p className="text-error">Password must be at least 8 characters</p>
                )}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isFormValid}
                >
                    Register
                </button>
                <button type="reset" className="btn btn-ghost">Cancel</button>
            </form>
        </div>
    );
};
