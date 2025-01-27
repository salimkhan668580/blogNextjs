import { NextResponse as res } from "next/server";  // Alias NextResponse to 'res'
import bcrypt from "bcrypt";
import User from "../../../backend/Models/userSchema";
import genToken from "../../../lib/genToken";
import dbConnect from "../../../lib/dbConnect";
import { cookies } from "next/headers";

export const GET = () => {
  return res.json({
    success: true,
  });
};

export const POST = async (req) => {
  
  try {

   const cookie=cookies()
    const { email, password } = await req.json();
    await dbConnect();
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",

      });
    }
    
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = genToken({
      fullname: userData.fullname,
      email: userData.email,
      userId: userData._id,
      role: userData.role,
    });
    cookie.set("user_Cookies",token)
    return res.json({
      success: true,
      message: "Logged In Successfully",
      userData,
      token,

    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
