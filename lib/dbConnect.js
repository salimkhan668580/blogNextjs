
import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(`mongodb://127.0.0.1/ecomBlogNext`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default dbConnect;
