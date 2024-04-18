import { Schema, model } from 'mongoose';

export const descriptionSchema = new Schema({
    desText: { // Descripción
        type : String,
        required : true
    }
})

export const Description = model("Description", descriptionSchema);