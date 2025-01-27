import Blog from "../../../backend/Models/blogSchema"
import dbConnect from "../../../lib/dbConnect"
import { NextResponse as res } from "next/server"

export const GET=async (req)=>{

    try {
          await dbConnect()
    const blogs= await Blog.find().sort({ createdAt: -1 })
    return res.json({
        success: true,
        message: "blogs fetched successfully",
        blogs
    })
    } catch (error) {
        return res.json(
            {
            success: false,
            message: error.message
          },
          { status: 500 }
    )
    }
}
export const POST=async (req)=>{
    try {
        

        await dbConnect()

        const body= await req.json()

      const blogCreated=await new Blog(body)
       await blogCreated.save()

        return res.json({
            success: true,
            message: "blog created successfully",
            data: blogCreated
        },{status:201})
    } catch (error) {
        return res.json(
            {
            success: false,
            message: error.message
          },
          { status: 500 }
    )
        
    }
   

}