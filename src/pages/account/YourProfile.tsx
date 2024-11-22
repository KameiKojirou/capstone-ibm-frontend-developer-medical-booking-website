import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

type Account = {
    name: string;
    email: string;
    phone: string;
};

export const YourProfile = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<Account | null>(null);

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
        }
        const storedAccount = localStorage.getItem("account");
        if (!storedAccount) {
            navigate("/register");
        } else {
            setAccount(JSON.parse(storedAccount));
        }
    }, [navigate]);

    const handleEditClick = () => {
        if (account) {
            setFormData(account);
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setFormData(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            localStorage.setItem("account", JSON.stringify(formData));
            setAccount(formData);
            handleCloseDialog();
        }
    };

    return (
        <div>
            <Title>Your Profile</Title>
            {account && (
                <div className="p-4 shadow-lg rounded-lg w-full max-w-md mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">Account Details</h2>
                    <div className="mb-4">
                        <label className="block font-medium">Name:</label>
                        <p className="text-gray-700">{account.name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Email:</label>
                        <p className="text-gray-700">{account.email}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Phone:</label>
                        <p className="text-gray-700">{account.phone}</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleEditClick}
                    >
                        Edit Information
                    </button>
                </div>
            )}

            <dialog ref={dialogRef} open={isDialogOpen} className="modal">
                {formData && (
                    <form className="modal-box" onSubmit={handleFormSubmit}>
                        <h3 className="font-bold text-lg">Edit Your Information</h3>
                        <div className="form-control mt-4">
                            <label className="label">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="input input-bordered"
                                disabled
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">Phone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn"
                                type="button"
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </dialog>
        </div>
    );
};
