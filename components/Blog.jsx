"use client"
import React from 'react'

function Blog({data}) {
  console.log(data)
  return (
    <div  className='w-full flex  justify-center items-center flex-col'>
      {
        data?.blogs?.map((post, index) => (
          <div key={index}  className='w-2/3 cursor-pointer px-10 hover:bg-gray-600 border hover:text-white shadow  my-5'>
            <h2 className='py-5'>{post?.title}</h2>
          </div>
        ))
      }
    </div>
  )
}
export default Blog