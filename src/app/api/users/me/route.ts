import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = getDataFromToken(request)
        const tokenData= await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:"UserFound",
            data:tokenData.username
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}