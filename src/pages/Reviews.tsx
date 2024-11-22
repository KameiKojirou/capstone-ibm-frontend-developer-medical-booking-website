import { useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

type Doctor = {
    name: string;
    speciality: string;
    rating: number;
    experience: number;
};

type Review = {
    doctorName: string;
    patientName: string;
    reviewText: string;
    score: number;
};

export const Reviews = () => {
    const account = localStorage.getItem("account");
    const appointments = JSON.parse(localStorage.getItem("appointments") || "{}");
    const consultations = JSON.parse(localStorage.getItem("consultations") || "{}");
    const storedReviews = JSON.parse(localStorage.getItem("reviews") || "{}");

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [reviews, setReviews] = useState<{ [key: string]: Review }>(storedReviews);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [reviewText, setReviewText] = useState<string>("");
    const [reviewScore, setReviewScore] = useState<number>(5);

    const dialogRef = useRef<HTMLDialogElement>(null);
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
    useEffect(() => {
        // Combine doctors from appointments and consultations
        const bookedDoctors = Object.values({ ...appointments, ...consultations }).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (entry: any) => entry.doctor
        );
        setDoctors(bookedDoctors);
    }, [appointments, consultations]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dialogRef.current && event.target === dialogRef.current) {
                handleCloseDialog();
            }
        };

        if (isDialogOpen) {
            dialogRef.current?.addEventListener("click", handleOutsideClick);
        }

        return () => {
            dialogRef.current?.removeEventListener("click", handleOutsideClick);
        };
    }, [isDialogOpen]);

    const handleReviewClick = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        const existingReview = reviews[doctor.name];
        if (existingReview) {
            setReviewText(existingReview.reviewText);
            setReviewScore(existingReview.score);
        } else {
            setReviewText("");
            setReviewScore(5);
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedDoctor(null);
        setReviewText("");
        setReviewScore(5);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDoctor || !account) return;

        const patientName = JSON.parse(account).name;

        const newReview: Review = {
            doctorName: selectedDoctor.name,
            patientName,
            reviewText,
            score: reviewScore,
        };

        const updatedReviews = { ...reviews, [selectedDoctor.name]: newReview };
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        handleCloseDialog();
    };

    return (
        <div>
            <Title>Reviews</Title>
            {account && <p>Logged in as: {JSON.parse(account).name}</p>}
            <h2 className="text-2xl font-bold py-4">Doctors You've Consulted</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Speciality</th>
                            <th>Experience</th>
                            <th>Action</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.name}>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.experience} years</td>
                                <td>
                                    <button
                                        className={`btn ${
                                            reviews[doctor.name] ? "btn-success" : "btn-primary"
                                        }`}
                                        onClick={() => handleReviewClick(doctor)}
                                    >
                                        {reviews[doctor.name] ? "Edit Review" : "Write Review"}
                                    </button>
                                </td>
                                <td>
                                    {reviews[doctor.name] ? (
                                        <div className="rating">
                                            {[1, 2, 3, 4, 5].map((score) => (
                                                <input
                                                    key={score}
                                                    type="radio"
                                                    name={`doctor-rating-${doctor.name}`}
                                                    className="mask mask-star-2 bg-orange-400"
                                                    checked={reviews[doctor.name].score === score}
                                                    readOnly
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">No review yet</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog ref={dialogRef} open={isDialogOpen} className="modal">
                {selectedDoctor && (
                    <form className="modal-box" onSubmit={handleFormSubmit}>
                        <h3 className="font-bold text-lg">
                            {reviews[selectedDoctor.name] ? "Edit Review" : "Write Review"} for{" "}
                            {selectedDoctor.name}
                        </h3>
                        <div className="form-control mt-4">
                            <label className="label">Patient Name:</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                readOnly
                                value={account ? JSON.parse(account).name : ""}
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">Review:</label>
                            <textarea
                                className="textarea textarea-bordered"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">Score:</label>
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((score) => (
                                    <input
                                        key={score}
                                        type="radio"
                                        name="rating"
                                        className={`mask mask-star-2 bg-orange-400`}
                                        checked={reviewScore === score}
                                        onChange={() => setReviewScore(score)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleCloseDialog}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Save Review
                            </button>
                        </div>
                    </form>
                )}
            </dialog>
        </div>
    );
};
