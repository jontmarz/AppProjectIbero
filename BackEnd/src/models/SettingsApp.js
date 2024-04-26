import { Schema, model } from "mongoose";

const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    academicPrograms: [{
        type: String,
        required: true
    }]
  });

export const settingsAppSchema = new Schema({
    faculties: [facultySchema],
    projectTypes: [{ // Tipo de proyecto
        type : String,
        required : false,
    }],
    researchLines: [{ // Linea de investigacion
        type : String,
        required : false,
    }],
    researchGroups: [{ // Grupo de investigacion
        type : String,
        required : false,
    }],
    seedLine: [{ // Linea de semillero de Investigación
        type : String,
        required : false,
    }],
})

export const SettingsApp = model("SettingsApp", settingsAppSchema);