import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{
        ie1 : {type: String, required: true},
        ie2 : {type: String, required: true},
        type : Schema.Types.Mixed
    },
    dirEffect:{
        ed1 : {type: String, required: true},
        ed2 : {type: String, required: true},
        ed3 : {type: String, required: true},
        type : Schema.Types.Mixed
    },
    centralProb: {
        type: String,
        required: true
    },
    dirCauses:{
        cd1 : {type: String, required: true},
        cd2 : {type: String, required: true},
        cd3 : {type: String, required: true},
        type : Schema.Types.Mixed
    },
    indCauses:{
        ci1 : {type: String, required: true},
        ci2 : {type: String, required: true},
        type : Schema.Types.Mixed
    },
})

export const Problem = model("Problem", problemSchema);