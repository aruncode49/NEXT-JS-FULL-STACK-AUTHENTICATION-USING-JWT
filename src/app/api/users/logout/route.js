import { NextResponse } from "next/server";

export async function GET() {
  try {
    // logout user
    const response = NextResponse.json({
      message: "User logout successfully",
      success: true,
    });

    response.cookies.delete("token");

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
