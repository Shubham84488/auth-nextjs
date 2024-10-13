"use client"
import React, { use, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function SignUp(){
    const router = useRouter()
    const [user,setUser]= useState({
        username:"",
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled] = useState(true)
    const [loading,setloading]= useState(false)

    useEffect(()=>{
        if(user.username.length>0 && user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    const onSignup= async()=>{
        try {
            setloading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Successful",response.data)
            router.push("/login")
        } catch (error:any) {
            console.log("Signup Failed",error.message)
            toast.error(error.message)
        }finally{
            setloading(false)
        }
    }
    return(
        <div className="flex flex-col items-center   justify-center min-h-screen py-2 ">
            <h1>{loading? "Loading" : "Signup"}</h1>
            <br />

            <label htmlFor="username">Username</label>
            <input type="text" className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
            onChange={(e)=>setUser({...user, username: e.target.value})}
            id="username"
            name="username"
            required/>

            <label htmlFor="email">Email</label>
            <input type="text" className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
            onChange={(e)=>setUser({...user,email:e.target.value})}
            id="email"
            name="email" 
            required/>

            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 rounded-lg border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black" 
            onChange={(e)=>setUser({...user,password:e.target.value})}
            id="password"
            name="password"
            required/>

            <button  onClick={onSignup}
            className="p-2 border-[1px] border-gray-300 rounded-lg mb-4 borfocus:outline-white focus:border-gray-600 text-white font-bold">{buttonDisabled?"No Signup" : "Signup Here"}</button>
            <Link href="/login">Visit login</Link>
        </div>
        
    )
}