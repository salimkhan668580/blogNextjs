import { cookies } from "next/headers";
import { NextResponse as res} from "next/server"

import jwt from "jsonwebtoken"

export const POST= async(req)=>{
    try {
    
        const { token } = await req.json();
      
    
        if (!token) {
            console.log("Token not found")
            return res.json({ error: "Token not provided" });
          }
          const session =await jwt.verify(token, process.env.JWT_SECRET);
          console.log("Session in session check =>", session);

      if(!session){
        return res.redirect(new URL('/login', request.url));
      }
      
      return res.json(session);
    } catch (error) {
        return res.redirect(new URL('/login', request.url));
    
    }

}