import { Router } from "express";
import { changeCurrentPassword,
         loginUser, 
         logoutUser,
         registerUser, 
         refreshAccessToken,
         getCurrentCustomer,
         updateAccountDetails,
         updateUserAvatar} from "../controllers/customer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    registerUser)

router.route("/login").post(loginUser)


// secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentCustomer)
router.route("/update-account").post(verifyJWT, updateAccountDetails)
router.route("/update-avatar").post(verifyJWT, updateUserAvatar)


export default router