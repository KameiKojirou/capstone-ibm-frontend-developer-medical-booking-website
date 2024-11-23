import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Card } from "../../components/Card";
import { SubTitle } from "../../components/SubTitle";
import { addToast } from "../../stores/toastStore";
import { FindADoctor } from "../../components/FindADoctor";

type Doctor = {
    name: string;
    speciality: string;
    rating: number;
    experience: number;
};

type Appointment = {
    doctor: Doctor;
    patientName: string;
    patientPhone: string;
    date: string;
    time: string;
};

export const Appointment = () => {
    const account = localStorage.getItem("account");
    const [speciality, setSpeciality] = useState<string>("");
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<{ [key: string]: Appointment }>(
        JSON.parse(localStorage.getItem("appointments") || "{}")
    );

    const dialogRef = useRef<HTMLDialogElement>(null); // Reference to the dialog element

    const doctors: Doctor[] = [
        { name: "Dr. John", speciality: "Cardiologist", rating: 4.5, experience: 10 },
        { name: "Dr. Jane", speciality: "Cardiologist", rating: 4.9, experience: 13 },
        { name: "Dr. Frakenstein", speciality: "Cardiologist", rating: 4.5, experience: 100 },
        { name: "Dr. Monster", speciality: "Dentist", rating: 3.5, experience: 1 },
        { name: "Dr. Dracula", speciality: "Dentist", rating: 4.5, experience: 400 },
        { name: "Dr. Who", speciality: "Dentist", rating: 4.5, experience: 10000 },
        { name: "Dr. Light", speciality: "General Physician", rating: 3.6, experience: 20 },
        { name: "Dr. Willy", speciality: "General Physician", rating: 3.7, experience: 18 },
        { name: "Dr. Robotnick", speciality: "General Physician", rating: 4.5, experience: 28 },
    ];

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

    const handleBookClick = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedDoctor(null);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDoctor) return;

        const formData = new FormData(e.currentTarget);
        const appointment: Appointment = {
            doctor: selectedDoctor,
            patientName: formData.get("patientName") as string,
            patientPhone: formData.get("patientPhone") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
        };

        const updatedAppointments = { ...appointments, [selectedDoctor.name]: appointment };
        setAppointments(updatedAppointments);
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        handleCloseDialog();
        addToast("Appointment booked successfully", "success", 5000);
    };

    const handleCancelAppointment = (doctorName: string) => {
        const updatedAppointments = { ...appointments };
        delete updatedAppointments[doctorName];
        setAppointments(updatedAppointments);
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        handleCloseDialog();
        addToast("Appointment canceled successfully", "success", 5000);
    };

    return (
        <div>
            <Title>Book an Appointment</Title>
            <FindADoctor />
            <img src="~/images/services/find-doctor.webp" alt="Find a Doctor" />
            <h2 className="text-2xl font-bold py-4">Find a Doctor</h2>
            <select
                aria-placeholder="Find a Doctor by speciality"
                className="select select-bordered w-full max-w-xs"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
            >
                <option value="" disabled>-- Find a Doctor by speciality --</option>
                <option>Cardiologist</option>
                <option>Dentist</option>
                <option>General Physician</option>
            </select>
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-8 [&>a]:btn [&>a]:btn-ghost [&>a]:h-auto [&>a]:p-4">
                {doctors
                    .filter((doc) => doc.speciality === speciality)
                    .map((doc) => (
                        <Card key={doc.name}>
                            <div className="flex flex-row justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-64"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <SubTitle>{doc.name}</SubTitle>
                            <p>Speciality: {doc.speciality}</p>
                            <p>Rating: {doc.rating}</p>
                            <p>Years of experience: {doc.experience}</p>
                            <button
                                className={`btn ${
                                    appointments[doc.name] ? "btn-success" : "btn-primary"
                                } mt-4`}
                                onClick={() => handleBookClick(doc)}
                            >
                                {appointments[doc.name] ? "Booked" : "Book Appointment"}
                            </button>
                        </Card>
                    ))}
            </div>

            <dialog ref={dialogRef} open={isDialogOpen} className="modal">
                {selectedDoctor && appointments[selectedDoctor.name] ? (
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            Appointment Details for {selectedDoctor.name}
                        </h3>
                        <p>Date: {appointments[selectedDoctor.name].date}</p>
                        <p>Time: {appointments[selectedDoctor.name].time}</p>
                        <p>Patient Name: {appointments[selectedDoctor.name].patientName}</p>
                        <p>Patient Phone: {appointments[selectedDoctor.name].patientPhone}</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={() => handleCancelAppointment(selectedDoctor.name)}
                            >
                                Cancel Appointment
                            </button>
                            <button className="btn" onClick={handleCloseDialog}>
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <form method="dialog" className="modal-box" onSubmit={handleFormSubmit}>
                        <h3 className="font-bold text-lg">
                            Book Appointment with {selectedDoctor?.name}
                        </h3>
                        <div className="form-control mt-4">
                            <label className="label">Patient Name:</label>
                            <input
                                type="text"
                                name="patientName"
                                className="input input-bordered"
                                required
                                defaultValue={account ? JSON.parse(account).name : ""}
                            />
                            <label>Patient Phone:</label>
                            <input
                                type="tel"
                                name="patientPhone"
                                className="input input-bordered"
                                required
                                defaultValue={account ? JSON.parse(account).phone : ""}
                            />
                            <label className="label">Preferred Date:</label>
                            <input type="date" name="date" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">Preferred Time:</label>
                            <input type="time" name="time" className="input input-bordered" required />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleCloseDialog}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Confirm
                            </button>
                        </div>
                    </form>
                )}
            </dialog>
        </div>
    );
};
