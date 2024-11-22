import { useEffect, useState } from "react";

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

    // Fetch appointments from localStorage
    const fetchAppointments = () => {
        const storedAppointments = localStorage.getItem("appointments");
        setAppointments(storedAppointments ? JSON.parse(storedAppointments) : {});
    };

    // Update appointments on component mount and set up listeners
    useEffect(() => {
        fetchAppointments();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "appointments") {
                fetchAppointments();
            }
        };

        // Polling to ensure updates in environments without reliable `storage` events
        const intervalId = setInterval(() => {
            fetchAppointments();
        }, 1000);

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);

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
