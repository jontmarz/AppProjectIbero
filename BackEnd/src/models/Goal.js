import { Schema, model } from 'mongoose';

export const goalSchema = new Schema({
    objEspe : { // Objetivo Especifico
        type : Object,
        require: true
    },
    objGen : { // Objetivo General
        type : String,
        require: true
    },
    titleProj : { // Titulo del Proyecto
        type: String,
        require: true
    }
})

export const Goal = model("Goal", goalSchema);