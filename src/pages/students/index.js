"use client"; // Add this directive

import { useEffect, useState } from "react";
import useCustomRouter from "../../next/router";
import axiosInstance from "../../axiosInstance"; // Correct the import path

const Students = () => {
  const { redirectToLogin } = useCustomRouter();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get("students/");
        setStudents(res.data);
      } catch (err) {
        setError("Failed to load students. Please log in.");
        redirectToLogin(); // Redirect to login page if unauthorized
      }
    };

    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    redirectToLogin(); // Redirect to login after logout
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
