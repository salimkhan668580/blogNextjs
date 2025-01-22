import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

export const GET = async () => {
  try {
    const cookie = cookies(); 
    cookie.delete("user_Cookies", { path: "/login" }); 

    return res.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return res.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 } 
    );
  }
};
