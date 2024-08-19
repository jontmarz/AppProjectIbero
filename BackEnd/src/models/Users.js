import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UsersSchema = new Schema({
    fullName: { // Nombre completo
        type :      String,
        required :  true,
    },
    typeDoc: { // Tipo de documento
        type :       String,
        required :   false,
    },
    identify: { // Numero de documento
        type :      Number,
        unique:     true,
        required :   true,
    },
    emailI: { // Correo institucional
        type :      String,
        required :  true,
        unique:     true,
        index:      { unique: true }
    },
    emailP: { // Correo personal
        type :      String,
        required :  true,
    },
    faculty: { // Facultad
        type :      String,
        required :  false,
    },
    academicProgram: { // Programa academico
        type :      String,
        required :  false,
    },
    code: { // Codigo de estudiante
        type : Number,
        required : false,
    },
    phone : { // Telefono
        type : Number,
        required : false,
    },
    typeProj : { // Tipo de proyecto
        type : String,
        required : false,
    },
    instLine: { // Linea de investigacion
        type : String,
        required : false,
    },
    ResearchGroup: { // Grupo de investigacion
        type : String,
        required : false,
    },
    seedLine: { // Linea de semillero de Investigación
        type : String,
        required : false,
    },
    role: { // Rol
        type :      String,
        required :  false,
    },
    projects: { // Proyectos asignados
        type :      [Schema.Types.ObjectId],
        ref :       "DataApp",
        required :  function() { return this.role === "Docente" },
    },
    password: { // Contraseña
        type :      String,
        required :  true,
    },
    creationDate: { // Fecha de creacion
        type :      Date,
        default :   Date.now,
    },
})

// HASHEO DE LA CONTRASEÑA A LA BASE DE DATOS ANTES DE ENVIARSE
UsersSchema.pre("save", async function (next){

    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (e) {
        throw new Error("Error al codificar la contraseña")
    }
})

UsersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Users = model("Users", UsersSchema);