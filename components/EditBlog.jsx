"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

function EditBlog() {
  const fetcher = async (url) => {
    return await fetch(url).then((res) => res.json());
  };
 
const [editId,setIdValue]=useState(null)
const [editdata,setEditData]=useState({})
  const { data: blog, error } = useSWR("/api/blog", fetcher);


  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    if(editId){
      try {
        setLoading(true);
        const res = await axios.post(`/api/blog/${editId}`,data);
        if (res) {
          toast.success("Blog update successfully");
          mutate("/api/blog");
        }
        reset();
        setIdValue(null)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
      return;
    }

    try {
      setLoading(true);
      setEditData(data)
      const res = await axios.post("/api/blog", data);
      if (res) {
        toast.success("Blog created  successfully");
        mutate("/api/blog");
      }
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const onEditvalue = async(id) => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      if (res?.data?.success) {
        setValue("title", res?.data?.blog.title);
        setValue("content", res?.data?.blog.content);
        setIdValue(res?.data?.blog?._id)
        toast.success("Blog data loaded for editing");
      }
    } catch (error) {
      toast.error("Failed to load blog data");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/blog/${id}`);
      toast.success("Blog deleted  successfully");
      setLoading(false);
      mutate("/api/blog");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex w-full ">
      <div className="  w-full">
        {/* ============ edit form ========== */}
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h1 className=" font-semibold text-2xl  my-14 ">{editId?"Edit Blog":"Add Blog"}</h1>

            <label htmlFor="" className="my-2">
              Title:
            </label>
            <input
              name="title"
              type="text"
              className="w-full px-6 rounded py-2 border border-rose-300 shadow "
              placeholder="title"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Minimum value is 3" },
                maxLength: { value: 99, message: "Maximum value is 99" },
              })}
            />
            {errors.title && (
              <span className="text-rose-500">{errors.title.message}</span>
            )}
            <br />
            <br />
            <br />
            <label htmlFor="" className="my-7">
              Content:
            </label>
            <br />

            <textarea
              name="content"
              placeholder="type content here..."
              className="w-full px-6 rounded py-2 border border-rose-300 shadow "
              {...register("content", {
                required: "Content is required",
                minLength: { value: 20, message: "Minimum value is 20" },
              })}
            />
            {errors.content && (
              <span className="text-rose-500">{errors.content.message}</span>
            )}
            <br />

            {
             editId ?  
              <button
                type="submit"
                disabled={isLoading ? true : false}
                className=" bg-blue-400 text-white  px-8 py-2 rounded"
              >

                edit
              </button>
             :
              <button
             type="submit"
             disabled={isLoading ? true : false}
             className=" bg-rose-400 text-white px-4 py-2 rounded"
           >
             submit
           </button>
            }
             <br />
            {isLoading && "Loading..."}
          </form>
        </div>
      </div>
      <div className=" max-h-screen mx-4 overflow-scroll w-full ">
        {blog?.blogs?.map((post, index) => (
          <div key={index} className="rounded py-3  my-3 px-4 shadow">
            <h2 className="font-bold capitalize">{post.title}</h2>
            <p>{post.content}</p>
            <div className="justify-between my-5 flex ">
              <CiEdit
                className="text-xl text-blue-500 cursor-pointer"
                onClick={() => onEditvalue(post._id)}
              />

              <CiTrash
                className="text-xl text-red-500 cursor-pointer"
                onClick={() => handleDelete(post._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditBlog;
