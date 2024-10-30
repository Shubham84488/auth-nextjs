"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Define the User type
interface User {
    username: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    // Validate the form fields
    useEffect(() => {
        const isValid = user.username.length > 0 && user.email.length > 0 && user.password.length > 0;
        setButtonDisabled(!isValid || loading);
    }, [user, loading]);

    const isEmailValid = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    const onSignup = async () => {
        if (!isEmailValid(user.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Successful", response.data);
            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle specific Axios errors
                const message = error.response?.data?.message || "Signup failed. Please try again.";
                toast.error(message);
            } else if (error instanceof Error) {
                // Handle other errors
                toast.error("An unexpected error occurred: " + error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-pink-100 via-white to-blue-200">
            <h1 className="text-2xl">{loading ? "Loading" : "Signup"}</h1>
            <br />

            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                className="p-2 border-black border-[3px] rounded-lg mb-4" 
                onChange={(e) => setUser({ ...user, username: e.target.value })} 
                id="username" 
                name="username" 
                required 
            />

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                className="p-2 border-black border-[3px] rounded-lg mb-4" 
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
                id="email" 
                name="email" 
                required 
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                className="p-2 rounded-lg border-black border-[3px] mb-4" 
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                id="password" 
                name="password" 
                required 
            />

            <button 
                onClick={onSignup} 
                className={`p-2 border-black border-[3px] rounded-lg mb-4 focus:outline-white focus:border-gray-600 font-bold ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`} 
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No Signup" : "Signup Here"}
            </button>
            <Link href="/login" className="text-green-900 text-xl font-semibold">Visit login</Link>
        </div>
    );
}
