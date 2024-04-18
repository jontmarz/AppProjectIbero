import { Schema, model } from "mongoose";

export const reviewSchema = new Schema({
    creationDate: { type: Date, default: Date.now }, // Fecha de creacion
    author: { type: Schema.Types.ObjectId, ref: "User" }, // Autor
    dataApp: { type: Schema.Types.ObjectId, ref: "DataApp" }, // Aplicacion de datos
    state: { type: String, required: true }, // Estado
    comment: { type: String, required: true }, // Comentario
})

export const Review = model("Review", reviewSchema);