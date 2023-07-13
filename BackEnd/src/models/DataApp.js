import { Schema, model } from 'mongoose';
import { problemSchema } from './Problem.js';
import { descriptionSchema } from './Description.js';
import { goalSchema } from './Goal.js';
import { recordSchema } from './Record.js';

export const dataAppSchema = new Schema({
    problems: { type: problemSchema },
    description :  { type: descriptionSchema },
    goals: { type: goalSchema },
    records: { type: recordSchema},
    user: {type: String}
})

export const DataApp = model("DataApp", dataAppSchema);
