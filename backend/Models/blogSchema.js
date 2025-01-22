import mongoose from "mongoose";

const BlogSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    content : {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 5000,
    },
   
 
},{timestamps: true})

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;