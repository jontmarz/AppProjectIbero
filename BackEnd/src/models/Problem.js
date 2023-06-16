import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{type : Schema.Types.Mixed},
    dirEffect:{type : Schema.Types.Mixed},
    centralProb: {
        type: String,
        required: true
    },
    dirCauses:{type : Schema.Types.Mixed},
    indCauses:{type : Schema.Types.Mixed},

})

export const Problem = model("Problem", problemSchema);