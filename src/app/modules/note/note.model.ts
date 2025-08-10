import mongoose, { Document, Schema } from "mongoose";
import { noteType } from "./note.interface";

const noteSchema:Schema<noteType> = new Schema<noteType> ({
    title:String,
    content:String,
    category:{
        type:String,
    enum:["personal" , "work" , "other",],
    default:"personal"
    },
    pinned:Boolean,
    tags:{
        label:String,
        color:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const Note= mongoose.model<noteType>("Note", noteSchema);

export default Note