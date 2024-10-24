"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { constrainedMemory } from "process"
import axios from "axios"

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
            console.log(response)
            console.log("Signup Successful",response.data)
            router.push("/profile")
        } catch (error:any) {
            console.log("Some Error Happened",error.message)

        }
    }

    return(
        <div className="flex flex-col items-center   justify-center min-h-screen py-2 ">
            <h1>Login</h1>
            <br />

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

            <Link className="text-sm italic text-red-700 mb-2" href="/forgotPassword">forgot password</Link>

            <button  onClick={onLogin}
            className="p-2 border-[1px] border-gray-300 rounded-lg mb-4 borfocus:outline-white focus:border-gray-600 text-white font-bold">{buttonDisabled?"No Login" : "Login"}</button>

            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}