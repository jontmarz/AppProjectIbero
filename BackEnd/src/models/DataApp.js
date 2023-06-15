import { Schema, model } from 'mongoose';
import { problemSchema } from './Problem.js';

export const dataAppSchema = new Schema({
    problems: { type: problemSchema },
    user: {type: String}
})

export const DataApp = model("DataApp", dataAppSchema);
