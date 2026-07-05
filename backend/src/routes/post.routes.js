import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isOwner } from "../middlewares/auth.middleware.js";
import { Post } from "../models/post.models.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, 
         createTextRequest } from "../controllers/post.controlller.js";

const router = Router();

router.route("/create-post").post(verifyJWT, upload.single("image"), createPost);
router.route("/create-text-request").post(verifyJWT, createTextRequest);