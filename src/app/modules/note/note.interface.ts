import { Types } from "mongoose"


export interface noteType extends Document{
title:string,
content:string
category:"personal" | "work" | "other",
pinned:boolean,
tags:{
    label:string,
    color:string
}
userId:Types.ObjectId
}