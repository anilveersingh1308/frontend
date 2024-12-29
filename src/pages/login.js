// import { useState } from 'react';
// import api from '../api';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('/auth/login/', { email, password });
//             localStorage.setItem('token', response.data.token);
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;


// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function Login() {
//     const { register, handleSubmit } = useForm();
//     const router = useRouter();

//     const onSubmit = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/token/', data);
//             localStorage.setItem('token', response.data.access);
//             router.push('/students');
//         } catch (error) {
//             alert('Login failed! Check your credentials.');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             <h1 className="text-2xl font-bold">Login</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mt-6 space-y-4">
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     {...register('username', { required: true })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     {...register('password', { required: true })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }



// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:8000/api/token/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await res.json();
//     if (data.access) {
//       login(data.access);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



import { useState } from "react";
import useCustomRouter from "../next/router";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const { redirectToStudents } = useCustomRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("token/", { email, password });
      localStorage.setItem("token", res.data.access);
      redirectToStudents(); // Navigate to the students page
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
