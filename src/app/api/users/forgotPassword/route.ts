import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        // Find user in the database
        const checkUser = await User.findOne({ email });
        
        if (!checkUser) {
            return NextResponse.json({ message: "User Not Found" }, { status: 400 });
        }

        // Send reset email if user exists
        await sendEmail({ email, emailType: "RESET", userid: checkUser._id });

        return NextResponse.json({ message: "User Found and Email Sent" });

    } catch (error: unknown) {
        // Handle error safely
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
