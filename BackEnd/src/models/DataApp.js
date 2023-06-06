import { Schema, model } from 'mongoose';
import { problemSchema } from './Problem.js';

export const dataAppSchema = new Schema({
    problems: { type: problemSchema }
})

export const DataApp = model("DataApp", dataAppSchema);
