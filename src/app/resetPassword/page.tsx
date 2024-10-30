"use client"

import axios from "axios"
import React,{useState,useEffect} from "react"
import toast, {Toaster } from "react-hot-toast"

export default function ResetPasswordPage(){
    const [password,setPassword]= useState("")
    const [token,setToken]=useState("")
    const [confirmPassword,setConfirmPassword]= useState("")

    const onSubmit=async()=>{
        try {
            if(password==confirmPassword){
                await axios.post("/api/users/resetPassword",{password,token})
                
            }else{
                toast.error("Both passwords should be same")
                setPassword("")
                setConfirmPassword("")
            }
    
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

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return(
        <div className="w-4/5 mx-auto my-[100px] bg-gradient-to-br from-pink-100 via-white to-blue-200">
            <div><Toaster/></div>

            <label htmlFor="email" className="block mb-3">New Password :</label>
            <input type="password" className="p-2 w-2/5 border-black border-[3px] rounded-lg mb-4 " 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            id="email"
            name="email" 
            required/>
            
            <label htmlFor="email" className="block mb-3">Confirm Password :</label>
            <input type="password" className="p-2 w-2/5 border-black border-[3px] rounded-lg mb-4 " 
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            id="email"
            name="email" 
            required/>

            <button onClick={onSubmit}
            className="block bg-gray-700 rounded-[10px] p-2 hover:opacity-80 focus:opacity-80">
                Submit
            </button>
        </div>
    )
}