import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use( cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// customer api endpoints
import customerRouter from "./routes/customer.routes.js";
import storeRouter from "./routes/store.routes.js";

app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/stores", storeRouter);

export {app}