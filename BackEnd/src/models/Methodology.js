import { Schema, model } from 'mongoose';

export const methodologySchema = new Schema({
    summary: { // Resumen de la propuesta
        type : String,
        required : true
    },
    approachResearch : { // Enfoque de investigacion
        type : String,
        required : true
    },
    scopeResearch : { // Alcance de investigacion
        type : String,
        required : true
    },
    designResearch : { // Diseño de investigacion
        type : String,
        required : true
    },
    techSPickupInfo : { // Tecnicas de recoleccion de informacion
        type : String,
        required : true
    },
    explainGoals : { // Explicar objetivos
        type : Object,
        required : true
    }
})

export const Methodology = model("Methodology", methodologySchema);