
// sign-up
// check user already exist
// password check for 6 characters (optional)
// password hash (using bcrypt js)
// user create 

import dbConnect from "@/lib/db";
import UserModel from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        await dbConnect();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // check user existence
        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // password check
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error: `${error}` },
            { status: 500 }
        );
    }
}
