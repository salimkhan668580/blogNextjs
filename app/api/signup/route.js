import { NextResponse } from "next/server";

import User from "@/backend/Models/userSchema";
import dbConnect from "@/lib/dbConnect";

export const POST = async (req) => {
  try {
    const body = await req.json();

    // Connect to the database
    await dbConnect();

    // Create a new user instance and save it
    const user = new User(body);
    await user.save();

    // Return the success response
    return NextResponse.json(
      {
        success: true,
        user: user,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return failure response
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 403 }
    );
  }
};
