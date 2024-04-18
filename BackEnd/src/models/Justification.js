import { Schema, model } from 'mongoose';

export const justificationSchema = new Schema({
    justification: { // Justificacion
        type : String,
        required : true
    }
})

export const Justification = model("Justification", justificationSchema);