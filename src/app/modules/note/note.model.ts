import mongoose, { Document, Schema } from "mongoose";
interface noteType extends Document{
title:string,
content:string
}
const noteSchema:Schema<noteType> = new Schema<noteType> ({
    title:String,
    content:String,
});

const Note= mongoose.model<noteType>("Note", noteSchema);

export default Note