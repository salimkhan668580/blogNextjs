'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


function Login() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.data.userData.role === 'admin') {
        router.push('/admin'); 
      } else {
        router.push('/'); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className='w-full justify-center flex h-screen items-center bg-gray-400'>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center bg-white px-6 border w-1/3 h-[75%] space-y-5 rounded'>
        <h1 className='text-center font-semibold text-2xl my-14 '>Login form</h1>

        <input
          name='email'
          type='email'
          className='w-full px-6 rounded py-2 border border-rose-300 shadow '
          placeholder="example@hmail.com"
          {...register("email", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <br />

        <input
          name='password'
          placeholder='*******'
          className='w-full px-6 rounded py-2 border border-rose-300 shadow '
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <br />

        <button type="submit" disabled={isLoading} className='w-full bg-rose-400 text-white px-4 py-2 rounded'>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <br />
        <p className='hover:underline'>
          Don't have an account? <Link href="/signup" className='hover:text-blue-500'><b>Signup</b></Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
