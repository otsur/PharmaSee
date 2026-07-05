import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyOwner } from "../middlewares/ownerVerify.middleware.js";
import { Test } from "../models/test.models.js";
import { createTest, 
         deleteTest, 
         getTest, 
         updateTest } from "../controllers/test.controller";

const router = Router()

router.route("/create-test").post(verifyJWT, createTest);
router.route("/:testId/update-test").patch(verifyJWT, verifyOwner(Test), updateTest);//
router.route("/:testId").get(verifyJWT, getTest);
router.route("/:testId/delete-test").get(verifyJWT, verifyOwner(Test), deleteTest);//


export default router