import { Schema, model } from 'mongoose';

export const tutorSchema = new Schema({
    tutor: { // tutor
        type : String,
        required : true
    }
})

export const tutor = model("tutor", tutorSchema);