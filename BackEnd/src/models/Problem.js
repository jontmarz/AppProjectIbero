import { Schema, model } from 'mongoose';

export const problemSchema = new Schema({
    indEffect:{ // Efecto indirecto
        type : Object,
        required : true
    },
    dirEffect:{ // Efecto directo
        type : Object,
        required : true
    },
    centralProb: { // Problema central
        type: String,
        required: true
    },
    dirCauses:{ // Causas directas
        type : Object,
        required : true
    },
    indCauses:{ // Causas indirectas
        type : Object,
        required : true
    },
})

export const Problem = model("Problem", problemSchema);