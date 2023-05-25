import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UsersSchema = new Schema({
    fullName: {
        type :      String,
        required :  true,
    },
    identifyType: {
        type :       String,
        required :   true,
    },
    identify : {
        type :      Number,
        unique:     true,
        required :   true,
        index:      { unique: true }
    },
    institucionalEmail : {
        type :      String,
        required :  true,
    },
    personalEmail : {
        type :      String,
        required :  true,
    },
    faculty : {
        type :      String,
        required :  true,
    },
    academyProgram : {
        type :      String,
        required :  true,
    },
    password : {
        type :      String,
        required :  true,
    },
    creationDate: {
        type :      Date,
        default :   Date.now,
    },
})

// HASHEO DE LA CONTRASEÑA A LA BASE DE DATOS ANTES DE ENVIARSE
UsersSchema.pre("save", async function (next){

    try {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (e) {
        console.log(e);
        throw new Error("Error al codificar la contraseña")
    }
})

UsersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const Users = model("Users", UsersSchema);