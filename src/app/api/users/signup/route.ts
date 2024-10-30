import {connect} from '@/dbconfig/dbconfig'
import { NextRequest,NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request:NextRequest){
    try {
        const reqbody= await request.json()
        const {username,email,password} = reqbody

        const checkUser = await User.findOne({email})

        if(checkUser){
            return NextResponse.json({error:"User Already Exists"},{status:400})
        }

        //hash password
        const salt= await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser= await newUser.save()
        //send verification email
        await sendEmail({email, emailType: "VERIFY", userid: savedUser._id})
        console.log("Hi")

        return NextResponse.json({message:"User Created Succesfully",
            success:true,
            savedUser
        })
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}