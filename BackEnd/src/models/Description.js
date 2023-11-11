import { Schema, model } from 'mongoose';

export const descriptionSchema = new Schema({
    desText: {type : String }
})

export const Description = model("Description", descriptionSchema);