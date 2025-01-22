'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

function Signup() {
    const router = useRouter();
    const [isLoading,setLoading]=useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); // useForm function ko sahi tarike se call karein
    
    const onSubmit =async(data)=>{
        try {
            setLoading(true)
            await axios.post('/api/signup', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
         router.push("/login")
            
        } catch (error) {
            toast.error(error.response.data.message ||error.message);
            console.log("error in singup",error)
        }
        setLoading(false)
    }
    return (
        <div className='w-full justify-center flex  h-screen items-center  bg-gray-400'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-center bg-white px-6 border w-1/3 h-[75%] space-y-5 rounded'>
       <h1 className='text-center font-semibold text-2xl  mt-14 '>Signup form</h1>
            
          
          
            {/* Validation added */}
            <input 
            name='fullname'
            placeholder='enter your name'
            className='w-full px-6 rounded py-2 border border-rose-300 shadow  '
            {...register("fullname", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br/>
         
            <input 
            name='email'
            type='email'
            className='w-full px-6 rounded py-2 border border-rose-300 shadow '
            placeholder="example@hmail.com"
            {...register("email", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br/>
        
            <input 
            name='password'
            placeholder='*******'
            className='w-full px-6 rounded py-2 border border-rose-300 shadow '
            {...register("password", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br/>
            <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-rose-400 text-white px-4 py-2 rounded ${
                isLoading ? "bg-gray-600" : ""
            }`}
            >
            Submit
            </button>
            {isLoading && "Loading..."}
            <br />
          <p className='hover:underline '>  Already have account <Link href="/login" className='hover:text-blue-500'><b>Login</b></Link></p>
        </form>
        </div>
    );
}

export default Signup;
