import { connectDB } from "@/db/connectDB";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user.model";

// database connection
await connectDB();

// sign up handler :: POST METHOD
export async function POST(req) {
  try {
    const data = await req.json();

    const { fullName, email, password } = data;
    console.log(fullName, email, password);

    //check basic validation for all fields
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // check if the user already exist or not
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // created new user and save it to database
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
