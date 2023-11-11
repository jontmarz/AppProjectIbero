import { Schema, model } from "mongoose";

export const reviewSchema = new Schema({
    creationDate: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    dataApp: { type: Schema.Types.ObjectId, ref: "DataApp" },
    comment: { type: String },
})

export const Review = model("Review", reviewSchema);