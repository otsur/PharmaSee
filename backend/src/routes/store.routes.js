import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { changeCurrentPassword, 
         getCurrentStore, 
         getDoctors, 
         getStore, 
         loginUser, 
         logoutUser, 
         refreshAccessToken, 
         registerUser, 
         updateContactDetails, 
         updateStoreDetails, 
         updateUserAvatar,
         updateUsername} from "../controllers/store.controller.js";


const router = Router()

router.route("/register").post(upload.single("avatar"),registerUser) ;

router.route("/login").post(loginUser);

// secured
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-store").get(verifyJWT, getCurrentStore);
router.route("/update-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/update-contact").post(verifyJWT, updateContactDetails)
router.route("/update-username").post(verifyJWT, updateUsername)
router.route("/update-store").post(verifyJWT, updateStoreDetails)
router.route("/:storeId/doctors").get(verifyJWT, getDoctors)
router.route("/:storeId").get(verifyJWT, getStore);


export default router