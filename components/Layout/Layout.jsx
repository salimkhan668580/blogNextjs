
"use client"
import axios from 'axios';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; 
import Permission from '../permission';



const navManu=[
    {
      label: "Home",
      href: "/",
    
    },
    {
      label: "Blog",
      href: "/blog",

    },
    {
      label: "Contact us",
      href: "/contact-us",
  
    },
  ]

function Layout({children}) {
  const router = useRouter();
  const pathname=usePathname()
  const [user,setUser]=useState({})
  const [roleState,setRoleState]=useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie;
    
      const hasAuthCookie = cookies.includes("user_Cookies");
      setIsLoggedIn(hasAuthCookie);
    };
    checkAuth();
  }, []);

  const [isChecking, setIsChecking] = useState(true); 

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('user_Cookies'); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role; 
          console.log(decodedToken)
          setUser(decodedToken);

          if (role === 'user') {
            setIsChecking(false); 
          } else {
            // toast.error("You don't have permission to access this page.1"); 
            setIsChecking(false);
            setRoleState(role);
          }
        } catch (error) {
          console.error("Error decoding token", error);
          setIsChecking(false);
         return   toast.error("Invalid token, please log in again.");
       
        }
      } else {
        setIsChecking(false);
        setRoleState(role);
        return  toast.error("You don't have permission to access this page.2");
      }
    };

    checkAuth();
  }, [router]);


    const blockList=[
        "/login",
        "/signup",
        "/logout",
        "/admin"
      ]
     
      const isBlockList=blockList.includes(pathname);
    
      if(isBlockList){
        return (
            <div>
            {children}
            </div>
        )
      }
      const handelLogout=async(e)=>{
       
         e.preventDefault();
 try {
 const res=await axios.get("/api/logout");
 toast.success(res.data.message);
 router.push("/login")
 } catch (error) {
  toast.error(error.message); 
 }
  }
  if(roleState=='admin'){
   return <Permission/>
  }

  console.log("user",user)

  return (
    <>
            <nav>
          <div className="flex w-full py-3 items-center justify-between px-6 shadow-lg static ">
         <Link href="/" className="font-semibold capitalize" >{user?.fullname}.</Link>
             
             <div className="flex items-center gap-16">
              {navManu.map((item,index)=>(
                <Link key={index} href={item.href} className={` ${pathname== item.href && " underline decoration-red-500 font-semibold "}`}>{item.label}</Link>
              ))}

              {isLoggedIn ?
               <p onClick={(e)=>handelLogout(e)} className='px-4 py-2 cursor-pointer rounded text-white bg-rose-500'>
               Logout
             </p>
             
             :  
             <>
              <Link href="/login" className=''>
               Login
             </Link>

             <Link href="/signup" className=' px-4 py-2 rounded text-white bg-rose-500'>
               Signup
            
             </Link>
             </>        
            
            }
             

             </div>
             
          </div>

        

        </nav>

       <section className='h-screen'>

        {children}
       </section>

<footer className="h-[300px] bg-gray-600 ">

<div >
 <h2 className="text-center">Footer </h2>
</div>


</footer>
    </>

  )
}

export default Layout