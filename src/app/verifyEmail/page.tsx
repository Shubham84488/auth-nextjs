"use client"

import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response=await axios.post('/api/users/verifyEmail', {token})
            console.log(response)
            setVerified(true);
        } catch (error: unknown) {
            setError(true);
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data); // log specific error response
            } else if (error instanceof Error) {
                console.error("Unexpected error:", error.message);
            }
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            console.log(token)
            verifyUserEmail();
        }
    }, [token,verifyUserEmail]);

    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )

}