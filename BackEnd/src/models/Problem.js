import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{
        type: Object,
        required: true
    },
    dirEffect:{
        type: Object,
        required: true
    },
    centralProb: {
        type: String},
    dircauses:{
        type: Object,
        required: true
    },
    indcauses:{
        type: Object,
        required: true
    },
})

export const Problem = model("Problem", problemSchema);