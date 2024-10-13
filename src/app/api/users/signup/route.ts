import {connect} from '@/dbconfig/dbconfig'
import { NextRequest,NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { error } from 'console'


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
        return NextResponse.json({message:"User Created Succesfully",
            success:true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}