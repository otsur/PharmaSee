import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyOwner } from "../middlewares/ownerVerify.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
import { createDoctor, 
         deleteDoctor, 
         getDoctor, 
         updateDoctorAvatar, 
         updateDoctorContactDetails, 
         updateDoctorDetails } from "../controllers/doctor.controller.js";
import { Doctor } from "../models/doctor.models.js";

const router = Router();

router.route("/create-doctors").post(verifyJWT, upload.single("avatar"), createDoctor)
router.route("/:doctorId/update-details").patch(verifyJWT,verifyOwner(Doctor), updateDoctorDetails)
router.route("/:doctorId/update-contact").patch(verifyJWT, verifyOwner(Doctor), updateDoctorContactDetails)
router.route("/:doctorId/update-avatar").patch(verifyJWT, upload.single("avatar"), verifyOwner(Doctor), updateDoctorAvatar)
router.route("/:doctorId").get(verifyJWT, getDoctor)
router.route("/:doctorId").delete(verifyJWT, verifyOwner(Doctor), deleteDoctor)

// search

export default router

