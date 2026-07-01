import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isOwner } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createDoctor, 
         deleteDoctor, 
         getDoctor, 
         updateDoctorAvatar, 
         updateDoctorContactDetails, 
         updateDoctorDetails } from "../controllers/doctor.controller.js";

const router = Router();

router.route("/create-doctors").post(verifyJWT, createDoctor)
router.route("/update-details").patch(verifyJWT,isOwner, updateDoctorDetails)
router.route("/update-contact").patch(verifyJWT, isOwner, updateDoctorContactDetails)
router.route("/update-avatar").patch(verifyJWT, isOwner, updateDoctorAvatar)
router.route("/:docId").get(verifyJWT, getDoctor)
router.route("/:doctorId").delete(verifyJWT, isOwner, deleteDoctor)

export default router

