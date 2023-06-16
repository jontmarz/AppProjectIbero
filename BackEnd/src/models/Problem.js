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

})

export const Problem = model("Problem", problemSchema);