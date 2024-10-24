import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqbody = await request.json()
        const {email} = reqbody

        const checkUser = await User.findOne({email})
        if(!checkUser){
            return NextResponse.json({"message":"Not Found"},{status: 400})
        }
        console.log(checkUser)
        await sendEmail({email,emailType: "RESET",userid:checkUser._id})
        console.log("kfajskfjlk")
        return NextResponse.json({message:"User Found"})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
    
}