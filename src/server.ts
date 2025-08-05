import { Server } from "http"
import app from "./app/app";
import { config } from "./app/config/index"
import mongoose from "mongoose";
let server: Server;
async function main() {
   try {
      await mongoose.connect(config.MONGODB_URI);
      console.log("Database connected.....");
      server = app.listen(config.PORT, () => {
         console.log(`Server is running on : http://localhost:${config.PORT}`);
      })
   }
   catch (error) {
      console.log(error)
   }
}
main()