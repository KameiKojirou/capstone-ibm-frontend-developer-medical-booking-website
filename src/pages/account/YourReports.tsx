import { useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jsPDF from "jspdf";

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
};

export const YourReports = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<{ [key: string]: Appointment }>({});
    const account = JSON.parse(localStorage.getItem("account") || "{}");

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
        }

        const storedAppointments = localStorage.getItem("appointments");
        if (!storedAppointments) {
            console.warn("No appointments found in localStorage.");
        } else {
            setAppointments(JSON.parse(storedAppointments));
        }
    }, [navigate]);

    const generateReportPDF = (appointment: Appointment) => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.text("Patient Report", 10, 10);

        // Patient Information
        doc.setFontSize(12);
        doc.text(`Patient Name: ${appointment.patientName}`, 10, 30);
        doc.text(`Phone: ${appointment.patientPhone}`, 10, 40);

        // Doctor Information
        doc.text(`Doctor Name: ${appointment.doctor.name}`, 10, 60);
        doc.text(`Speciality: ${appointment.doctor.speciality}`, 10, 70);
        doc.text(`Experience: ${appointment.doctor.experience} years`, 10, 80);

        // Fake Medication and Orders
        doc.text("Medications:", 10, 100);
        doc.text("- Lorem ipsum dolor sit amet", 10, 110);
        doc.text("- Consectetur adipiscing elit", 10, 120);

        doc.text("Doctor's Orders:", 10, 140);
        doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 10, 150);
        doc.text("Vestibulum vitae orci sit amet justo gravida luctus.", 10, 160);

        doc.save(`${appointment.patientName}_Report.pdf`);
    };

    return (
        <div>
            <Title>Your Reports</Title>
            {account && <p>Logged in as: {account.name}</p>}
            {Object.keys(appointments).length > 0 ? (
                <div className="overflow-x-auto mt-8">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Speciality</th>
                                <th>Experience</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(appointments).map((appointment) => (
                                <tr key={appointment.doctor.name}>
                                    <td>{appointment.doctor.name}</td>
                                    <td>{appointment.doctor.speciality}</td>
                                    <td>{appointment.doctor.experience} years</td>
                                    <td>
                                        <button
                                            className="btn btn-info mr-2"
                                            onClick={() => generateReportPDF(appointment)}
                                        >
                                            Download Report
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                window.open(
                                                    URL.createObjectURL(
                                                        new Blob(
                                                            [
                                                                `
Patient Name: ${appointment.patientName}
Phone: ${appointment.patientPhone}
Doctor Name: ${appointment.doctor.name}
Speciality: ${appointment.doctor.speciality}
Experience: ${appointment.doctor.experience} years

Medications:
- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit

Doctor's Orders:
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Vestibulum vitae orci sit amet justo gravida luctus.
                                                                `,
                                                            ],
                                                            { type: "text/plain" }
                                                        )
                                                    ),
                                                    "_blank"
                                                )
                                            }
                                        >
                                            View Report
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-8">No appointments found.</p>
            )}
        </div>
    );
};
