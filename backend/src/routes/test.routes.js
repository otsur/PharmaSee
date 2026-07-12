import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyOwner } from "../middlewares/ownerVerify.middleware.js";
import { Test } from "../models/test.models.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createTest, 
         deleteTest, 
         getTest, 
         updateTest } from "../controllers/test.controller.js";

const router = Router()

router.route("/create-test").post(verifyJWT, upload.none(), createTest);
router.route("/:id/update-test").patch(verifyJWT, verifyOwner(Test), upload.none(), updateTest);//
router.route("/:testId").get(verifyJWT, getTest);
router.route("/:id").delete(verifyJWT, verifyOwner(Test), deleteTest);//


export default router