import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Userschema= new mongoose.Schema({ 
    fullname:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    } ,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        minlength: 6,
        maxlength: 255,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024,
        trim: true,
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }

},{timestamps:true })

Userschema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password.toString(), 12);
    }
    next()
}
)
const User = mongoose.models.User || mongoose.model("User", Userschema);

export default User;