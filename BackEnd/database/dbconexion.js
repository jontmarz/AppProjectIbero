import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

try {
	mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_MONGO);
    console.log("DATABASE CONEXION SUCESSFULL")
} catch (e) {
    console.log("ERROR CONEXION :" + e);
}