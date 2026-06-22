import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.on("ERROR", (error) => {
        console.log("APP ERROR: ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running at ${process.env.PORT}`);
    })
})
.catch((er) => {
    console.log('MONGODB connection FAILED!!', er)
})