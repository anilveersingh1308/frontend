import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignUp() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8000/api/signup/', data);
            router.push('/login');
        } catch (error) {
            alert('Sign-up failed!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mt-6 space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    {...register('username', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}