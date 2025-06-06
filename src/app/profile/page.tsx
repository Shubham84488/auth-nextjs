"use client"
import axios from "axios"
import Link from "next/link"
import toast,{Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [data,setData] = useState("nothing")

    const logout=async()=>{
        try {
            const response = await axios.get("api/users/logout")
            toast.success("Logout Successful")
            router.push('/login')
            console.log(response)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Some Error Happened", error.message);
                toast.error("Some Error Happened: " + error.message);
            } else {
                console.log("An unknown error occurred");
                toast.error("An unknown error occurred.");
            }
        }
    }

    const getUserDetails=async()=>{
        const res= await axios.get('/api/users/me')
        console.log(res.data.data)
        setData(res.data.data)
    }

    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster/>
            <h1>Profile</h1>
            <hr />
            <h2  className="p-1 rounded bg-pink-200 font-extrabold">{data=="nothing" ? "Nothing":`Username:${data}`}</h2>
            <hr />
            <button onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

            <button onClick={getUserDetails}
            className="bg-green-800 mt-4 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded"
            >Get User Details
            </button>
            <Link href="/" className="bg-green-800 mt-4 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded">Home</Link>
        </div>
    )
};
