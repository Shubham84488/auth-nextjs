"use client"
import React,{ useState} from "react";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";

export default function ForgotPassword(){

    const [email,setEmail]= useState("");

    const onSubmit=async()=>{
        try {
            console.log(email)
            const response = await axios.post("/api/users/forgotPassword",{email})
            console.log(response)
            if(response.data.message=="Not Found"){
                toast.error("Not a valid email, try again!")
                setEmail("")
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

    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 h-[100vh]">
            <div className=" w-4/5 mx-auto py-[100px]">
                <div><Toaster/></div>

                <label htmlFor="email" className="block mb-3">Enter your emailID below :</label>
                <input type="text" className="p-2 w-2/5 border-black border-[3px] rounded-lg mb-4 " 
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                id="email"
                name="email" 
                required/>

                <button onClick={onSubmit}
                className="block bg-red-500 text-white rounded-[10px] p-2 hover:opacity-80 focus:opacity-80">
                    Submit
                </button>
            </div>
        </div>
        
    )
}