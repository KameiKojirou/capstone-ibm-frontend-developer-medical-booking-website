import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

export const AppointmentNotifications = () => {
    const [appointments, setAppointments] = useState<{ [key: string]: Appointment }>({});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Function to check login status
    const checkLoginStatus = () => {
        const token = Cookies.get("token");
        const account = localStorage.getItem("account");
        setIsLoggedIn(!!token && !!account);
    };

    useEffect(() => {
        // Check login status on component mount
        checkLoginStatus();

        const handleStorageChange = () => {
            checkLoginStatus();
        };

        // Monitor localStorage changes
        window.addEventListener("storage", handleStorageChange);

        // Poll Cookies for token changes (since "storage" event doesn't cover cookies)
        const intervalId = setInterval(() => {
            checkLoginStatus();
        }, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            setAppointments({}); // Clear appointments when logged out
            return;
        }

        const fetchAppointments = () => {
            const storedAppointments = localStorage.getItem("appointments");
            setAppointments(storedAppointments ? JSON.parse(storedAppointments) : {});
        };

        fetchAppointments();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "appointments") {
                fetchAppointments();
            }
        };

        // Monitor changes to appointments in localStorage
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="toast toast-end">
            {Object.values(appointments).map((appointment, index) => (
                <div
                    key={index}
                    className="alert alert-info shadow-lg"
                >
                    <div>
                        <span>
                            <strong>Appointment with {appointment.doctor.name}</strong>
                            <br />
                            <span>Speciality: {appointment.doctor.speciality}</span>
                            <br />
                            <span>Date: {appointment.date}</span>
                            <br />
                            <span>Time: {appointment.time}</span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
