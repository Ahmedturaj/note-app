import express, { Application, Request, Response } from "express";
import router from "../router";

const app: Application = express();
app.use(express.json());
app.use("/api/v1", router);
app.get("/", (req:Request, res:Response)=>{
    res.send("Welcome To note app.")
})

export default app;
