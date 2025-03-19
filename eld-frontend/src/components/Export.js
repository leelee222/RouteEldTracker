import React, { useEffect, useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DriverLogChart = () => {
    const [logs, setLogs] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch("/api/driver_logs/")
            .then((res) => res.json())
            .then((data) => setLogs(data))
            .catch((error) => console.error("Error fetching logs:", error));
    }, []);

    const generatePDF = () => {
        const input = chartRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.text("Driver Daily Log Report", 10, 10);
            pdf.addImage(imgData, "PNG", 10, 20, 190, 80);
            pdf.save("Driver_Log_Report.pdf");
        });
    };

    return (
        <div>
            <h2>Driver Daily Log</h2>
            <div ref={chartRef} style={{ background: "#fff", padding: "10px" }}>
                <table border="1" cellPadding="5" width="100%">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Off Duty</th>
                            <th>Sleeper Berth</th>
                            <th>Driving</th>
                            <th>On Duty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.date}</td>
                                <td>{log.off_duty} hrs</td>
                                <td>{log.sleeper_berth} hrs</td>
                                <td>{log.driving} hrs</td>
                                <td>{log.on_duty} hrs</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={logs} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="date" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="off_duty" stackId="a" fill="#8884d8" name="Off Duty" />
                        <Bar dataKey="sleeper_berth" stackId="a" fill="#82ca9d" name="Sleeper Berth" />
                        <Bar dataKey="driving" stackId="a" fill="#ffc658" name="Driving" />
                        <Bar dataKey="on_duty" stackId="a" fill="#ff7300" name="On Duty" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <button onClick={generatePDF} style={{ marginTop: "10px" }}>
                Export to PDF
            </button>
        </div>
    );
};

export default DriverLogChart;
