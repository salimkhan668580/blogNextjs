'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; 
import axios from 'axios';
import Permission from '../permission';

function AdminLayout({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [user,setUser]=useState({});
    const [roleState,setRoleState]=useState("") 
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('user_Cookies'); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken)
          const role = decodedToken.role; 

          if (role === 'admin') {
            setIsChecking(false); 
          } else {
            setRoleState(role);
            setIsChecking(false);
            toast.error("You don't have permission to access this page.");
          
          }
        } catch (error) {
          console.error("Error decoding token", error);
          setIsChecking(false);
          toast.error("Invalid token, please log in again.");
       
        }
      } else {
        setIsChecking(false);
        setRoleState(role);
        toast.error("You don't have permission to access this page.");
    
      }
    };

    checkAuth();
  }, [router]);

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

  if (roleState=="user") {
    return <Permission/>
    
  }
  return (
    <div className="grid w-full grid-cols-12">
      <div className="col-span-3 h-screen px-6 text-white rounded bg-gray-500">
        <h1 className="text-center text-2xl my-4 capitalize  ">Admin <b> {user?.fullname}</b></h1>
        <div className="w-full py-3 cursor-pointer border rounded shadow bg-rose-500 font-semibold px-3">
          Home
        </div>
        <div
         className="w-1/3 my-10   text-center py-3 cursor-pointer border rounded shadow  font-semibold px-3"

          onClick={(e)=>handelLogout(e)}
         >
          Logout
        </div>

      </div>

      <div className="col-span-9 p-10 h-screen rounded">{children}</div>
    </div>
  );
}

export default AdminLayout;
