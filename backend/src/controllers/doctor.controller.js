import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Store } from "../models/store.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Doctor } from "../models/doctor.models.js";
import { upload } from "../middlewares/multer.middleware.js";

const createDoctor = asyncHandler( async(req, res) => {
    const {fullName, email, phoneNumber, degree, speciality,
           appointmentCost, arrivaltTime, departureTime, activeStatus} = req.body;
    
    if(
        [fullName, email, phoneNumber, degree, speciality,
         arrivaltTime, departureTime
        ].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All the fields are required")
    }

    if(activeStatus === undefined || activeStatus === null){
        throw new ApiError(400, "Presence status of the doctor is required")
    }

    if(appointmentCost === undefined || appointmentCost === isNaN){
        throw new ApiError(400, "Please enter a valid cost")
    }

    let avatarLocalPath;

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const store = req.user?._id;

    const doctor = await Doctor.create(
        {
            fullName,
            email,
            phoneNumber,
            degree, 
            speciality,
            appointmentCost,
            arrivaltTime,
            departureTime,
            store,
            avatar: avatar?.url || "",
        }
    )

    if(!doctor){
        throw new ApiError(500, "Something went wrong while creating doctor")
    }

    return res.status(200)
              .json( new ApiResponse(
                200,
                doctor,
                "Doctor created successfully"
              ))
})

const updateDoctorDetails = asyncHandler( async( req, res) => {
    const {fullName,appointmentCost, arrivaltTime, departureTime, activeStatus} = req.body;

    const updates = {};

    if(fullName !== undefined) updates.fullName = fullName;
    if(appointmentCost !== undefined) updates.appointmentCost = appointmentCost;
    if(arrivaltTime !== undefined) updates.arrivaltTime = arrivaltTime;
    if(departureTime !== undefined) updates.departureTime = departureTime;
    if(activeStatus !== undefined) updates.activeStatus = activeStatus;

    const doctor = await Doctor.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                updates
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
              .json( new ApiResponse(200, doctor, "Doctor details updated successfully"))
})

const updateDoctorContactDetails = asyncHandler(async(req, res) => {
    const {email, phoneNumber} = req.body;

    const updates = {};

    if(email !== undefined) updates.email = email;
    if(phoneNumber !== undefined) updates.phoneNumber = phoneNumber;

    const doctor = await Doctor.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { updates }
        },
        {
            new: true
        }
    )

    return res.status(200)
              .json( new ApiResponse(200, doctor, "Doctor contact details updated successfully"))

})

const updateDoctorAvatar = asyncHandler( async(req, res) => {
    const avatarLocalPath = req.file;
    if(!avatarLocalPath){
        throw new ApiError(401, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new ApiError(400, "Something went wrong while uploading on cloudinary")
    }

    const doctor = await Doctor.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { avatar }
        },
        {
            new: true
        }
    )

    return res.status(200)
              .json(new ApiResponse(200, doctor, "Doctor avatar updated successfully"))
})

const getDoctor = asyncHandler(async(req, res) => {
    const {docId} = req.params;

    if(!docId) {
        throw new ApiError(401, "Unavailable request")
    }

    const doctor = await Doctor.findById(docId)

    if(!doctor){
        throw new ApiError(401, "No doctors were found")
    }

    return res.status(200)
              .json(new ApiResponse(200, doctor, "Doctor fetched successfully!"))
})

const deleteDoctor = asyncHandler( async(req, res) => {
    const {doctorId} = req.params;
    const deleted = await Doctor.findByIdAndDelete(doctorId);

    if(!deleted){
        throw new ApiError(404, "Doctor not found")
    }

    return res.status(200)
              .json( new ApiResponse(200, {}, "Doctor deleted successully"))
    
})


export {
    createDoctor,
    updateDoctorDetails,
    updateDoctorContactDetails,
    updateDoctorAvatar,
    getDoctor,
    deleteDoctor
}


