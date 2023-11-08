import { Schema, model } from 'mongoose';

export const goalSchema = new Schema({
    objEspe : {type : Object},
    objGen : {type : String},
    titleProj : { type: String },
    creationDate: { type: Date, default: Date.now },
})

export const Goal = model("Goal", goalSchema);