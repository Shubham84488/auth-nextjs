"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"

export default function LoginPage(){

    const router = useRouter()
    const [user,setUser]= useState({
        "username":"",
        "email":"",
        "password":""
    })
    const [buttonDisabled,setButtonDisabled]=useState(true)


    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    async function onLogin(){
        try {
            const response = await axios.post("/api/users/login",user)
            console.log("Signup Successful",response.data)
            router.push("/profile")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    // Display specific error messages returned from the backend
                    toast.error(error.response.data.message);
                } else {
                    // Handle other Axios errors
                    toast.error("An unexpected error occurred with the request");
                }
            } else if (error instanceof Error) {
                // Handle non-Axios errors
                console.log("Error:", error.message);
                toast.error("An unexpected error occurred");
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }

    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 flex flex-col items-center justify-center min-h-screen py-2 ">
            <Toaster/>
            
            <h1 className="text-2xl font-extrabold">Login</h1>
            <br />

            <label htmlFor="email">Email</label>
            <input type="text" className="p-2 border-black border-[3px] rounded-lg mb-4  " 
            onChange={(e)=>setUser({...user,email:e.target.value})}
            id="email"
            name="email" 
            required/>

            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 rounded-lg border-black border-[3px] mb-4  " 
            onChange={(e)=>setUser({...user,password:e.target.value})}
            id="password"
            name="password"
            required/>

            <Link className="text-sm italic text-green-700 mb-2" href="/forgotPassword">forgot password</Link>

            <button  onClick={onLogin}
            className="p-2 border-black border-[3px] rounded-lg mb-4 font-bold">{buttonDisabled?"No Login" : "Login"}</button>

            <Link href="/signup" className="text-green-900 text-xl font-semibold">Visit Signup</Link>
        </div>
    )
}