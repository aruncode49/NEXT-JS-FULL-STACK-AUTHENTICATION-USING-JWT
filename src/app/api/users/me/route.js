import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req) {
  try {
    const userId = getDataFromToken(req);
    const userData = await User.findById(userId).select("-password");
    return NextResponse.json({
      message: "User found",
      data: userData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
