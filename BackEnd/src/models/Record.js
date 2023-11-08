import { Schema, model } from 'mongoose';

export const recordSchema = new Schema({
    recordlist: {type : Object},
    creationDate: { type: Date, default: Date.now },
})

export const Record = model("Record", recordSchema);