import { Schema, model } from 'mongoose';
import { problemSchema } from './Problem.js';
import { descriptionSchema } from './Description.js';
import { justificationSchema } from './Justification.js';
import { methodologySchema } from './Methodology.js';
import { goalSchema } from './Goal.js';
import { recordSchema } from './Record.js';
import { ethicalImpactsSchema } from './EthicalImpacts.js';
import { reviewSchema } from './Reviews.js';

export const dataAppSchema = new Schema({
    problems: { type: problemSchema }, // Problemas
    description :  { type: descriptionSchema }, // Descripción
    justification :  { type: justificationSchema }, // Justificación
    methodology: { type: methodologySchema }, // Metodología
    ethicalImpacts: { type: ethicalImpactsSchema }, // Éticas e Impáctos
    goals: { type: goalSchema }, // Objetivos
    records: { type: recordSchema }, // Registros
    review :  { type: reviewSchema }, // Revisiones
    deadline: { type: Date }, // Fecha de entrega
    user: { type: String }, // Usuario
    creationDate: { // Fecha de creacion
        type :      Date,
        default :   Date.now,
    },

})
export const DataApp = model("DataApp", dataAppSchema);
