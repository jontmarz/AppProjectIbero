import { Schema, model } from 'mongoose';

export const recordSchema = new Schema({
    recordlist: {type : Object}
})

export const Record = model("Record", recordSchema);