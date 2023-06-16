import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{
        ie1 : {type: String, required: true},
        ie2 : {type: String, required: true},
    },
    dirEffect:{
        ed1 : {type: String, required: true},
        ed2 : {type: String, required: true},
        ed3 : {type: String, required: true},
    },
    centralProb: {
        type: String,
        required: true
    },
    dirCauses:{
        cd1 : {type: String, required: true},
        cd2 : {type: String, required: true},
        cd3 : {type: String, required: true},
    },
    indCauses:{
        ci1 : {type: String, required: true},
        ci2 : {type: String, required: true},
    },

})

export const Problem = model("Problem", problemSchema);