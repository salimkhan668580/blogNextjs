import Blog from "@/backend/Models/blogSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse as res } from "next/server"

export const POST=async(req, { params })=>{

    try {
        const { id } = params;
        const body = await req.json();
        await dbConnect()
        const blog=await Blog.findByIdAndUpdate(id,body)
        if(!blog) return res.status(404).json({ success: false, message: "Blog not found"},{status: 404})
        return res.json(
            { 
                success: true,
                message: "Blog updated successfully",
                blog,
            },
            {status: 200}

        )
        
    } catch (error) {
        return res.json({
            success: false,
            message:error.message,
        })
    }
    

 }
    
export const DELETE=async(req, { params })=>{

    try {
        const { id } = params;

        await dbConnect()
        const blog=await Blog.findByIdAndDelete(id)
        if(!blog) return res.status(404).json({ success: false, message: "Blog not found"},{status: 404})
        return res.json(
            { 
                success: true,
                message: "Blog deleted successfully",
                blog,
            },
            {status: 200}

        )
        
    } catch (error) {
        return res.json({
            success: false,
            message:error.message,
        })
    }
    

 }
 
 export const GET = async (req, { params }) => {
   try {
     const { id } = await params; 
 
     await dbConnect(); 
 
     const blog = await Blog.findById(id); 
 
     if (!blog) {
     
       return res.json(
         {
           success: false,
           message: "Blog not found",
         },
         { status: 404 }
       );
     }
 
  
     return res.json(
       {
         success: true,
         message: "Blog fetched successfully",
         blog,
       },
       { status: 200 }
     );

   } catch (error) {
     console.error("Error fetching blog:", error.message);
     return res.json(
       {
         success: false,
         message: "Internal Server Error",
         error: error.message,
       },
       { status: 500 }
     );
   }
 };
 



