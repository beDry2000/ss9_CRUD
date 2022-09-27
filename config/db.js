import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);

        console.log("server connected to " + db.connection.host);
    } catch (err) { 
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;