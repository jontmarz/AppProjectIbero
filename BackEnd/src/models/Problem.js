import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{type : Object},
    dirEffect:{type : Object},
    centralProb: {
        type: String,
        required: true
    },
    dirCauses:{type : Object},
    indCauses:{type : Object},
    creationDate: { type: Date, default: Date.now }
})

export const Problem = model("Problem", problemSchema);