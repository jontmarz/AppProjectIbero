import { Schema, model } from "mongoose";

export const reviewSchema = new Schema({
    creationDate: { type: Date, default: Date.now },
    author: { type: String },
    comment: { type: String },
})

export const Review = model("Review", reviewSchema);