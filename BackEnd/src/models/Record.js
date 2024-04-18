import { Schema, model } from 'mongoose';

export const recordSchema = new Schema({
    recordlist: {
        type : Object,
        required : true
    } // Lista de registros
})

export const Record = model("Record", recordSchema);