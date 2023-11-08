import { Schema, model } from 'mongoose';

export const descriptionSchema = new Schema({
    desText: {type : String },
    creationDate: { type: Date, default: Date.now },
})

export const Description = model("Description", descriptionSchema);