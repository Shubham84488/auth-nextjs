import { NextRequest,NextResponse } from "next/server";
import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { use } from "react";
import { error } from "console";
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqbody = await request.json()
        const {email,password} = reqbody

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message: "User does not exist"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:"Invalid password"},{status:400})
        }
        const tokenData= {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        const accessToken = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {expiresIn:"1d"}
        )
        const response = NextResponse.json({
            message:"Login Successful",
            success:true
        })
        response.cookies.set("token",accessToken,{
            httpOnly:true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}