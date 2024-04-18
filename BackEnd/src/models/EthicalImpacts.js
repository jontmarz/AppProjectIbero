import { Schema, model } from 'mongoose';

export const ethicalImpactsSchema = new Schema({
    ethicals: { // consideraciones éticas
        type : String,
        required : true
    },
    impacts: { // Impactos y productos esperados
        type : String,
        required : true
    },
})

export const EthicalImpacts = model("ethicalImpacts", ethicalImpactsSchema);