import { cookies } from 'next/headers';
import { NextResponse as res } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {

    try {
  const cookieStore = cookies();
  if (!await cookieStore.get('user_Cookies')) {
    return res.redirect(new URL('/login', request.url));
  }

  const token = await cookieStore.get('user_Cookies')?.value;

  if (token) {
   
    const decodedToken = jwt.decode(token);
   
      const apiResponse = await fetch(`${process.env.BASE_URL}/api/session`,{
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const { role } = decodedToken;
      if (!apiResponse.ok) {
        return res.redirect(new URL('/login', request.url));
      }
    const body=await apiResponse.json();
    if(role=='admin'){
      const result=res.next()
      result.cookies.set("session",JSON.stringify(body),{maxAge:(7*24*60*60*1000)});
      return result;
    } else {
      // alert("your are not authorized to")
      return res.redirect( request.url);
      // return res.redirect(new URL('/login', request.url));
    }
    }
  } catch (error) {
    console.error('Error during session validation:', error);
    return res.redirect(new URL('/login', request.url));
  }

}


export const config = {
  matcher: ['/admin/:path*'],

};