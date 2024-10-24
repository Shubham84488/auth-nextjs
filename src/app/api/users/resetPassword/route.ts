import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/dbconfig/dbconfig'
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request:NextRequest){
    try {
        const reqbody=await request.json()
        const {password,token} = reqbody

        const salt= await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        const ourUser= await User.findOne({forgotPasswordToken: token,forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if (!ourUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        ourUser.password = hashedPassword
        await ourUser.save()
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}