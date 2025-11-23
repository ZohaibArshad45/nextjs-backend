import React from "react";

const PostAPI = () => {
  const explanation = `
This API handles user signup with proper validation.

It checks if the user already exists, validates the password length,
hashes the password with bcrypt, saves the user in MongoDB,
and returns the created user.

If anything goes wrong, it responds with clear error messages.
`;

  const code = `
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

        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error: \`\${error}\` },
            { status: 500 }
        );
    }
}
`;

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gray-100 text-gray-800 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed">
        {explanation}
      </div>

      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default PostAPI;
