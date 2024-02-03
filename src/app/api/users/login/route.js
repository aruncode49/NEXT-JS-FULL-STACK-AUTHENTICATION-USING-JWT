import { connectDB } from "@/db/connectDB";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";

// database connection
connectDB();

// login handler :: POST METHOD
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // check if the user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // check the password is correct or not
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Password is wrong" },
        { status: 400 }
      );
    }

    // create jwt payload
    const payload = {
      id: user._id,
      name: user.fullName,
      email: user.email,
    };

    // create jwt token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User login successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
