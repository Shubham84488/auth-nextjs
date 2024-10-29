"use client"
import React,{useEffect, useState} from "react";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";

export default function forgotPassword(){

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
        } catch (error:any) {
            console.log("Some Error Happened",error.message)
        }
    }

    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 w-4/5 mx-auto my-[100px]">
            <div><Toaster/></div>

            <label htmlFor="email" className="block mb-3">Enter your emailID below :</label>
            <input type="text" className="p-2 w-2/5 border-black border-[3px] rounded-lg mb-4 " 
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            id="email"
            name="email" 
            required/>

            <button onClick={onSubmit}
            className="block bg-red-500 rounded-[10px] p-2 hover:opacity-80 focus:opacity-80">
                Submit
            </button>
        </div>
    )
}