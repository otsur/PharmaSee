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
           appointmentCost, arrivalTime, departureTime, activeStatus} = req.body;
    
    if(
        [fullName, email, phoneNumber, degree, speciality,
         arrivalTime, departureTime
        ].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All the fields are required")
    }

    if(activeStatus === undefined || activeStatus === null){
        throw new ApiError(400, "Presence status of the doctor is required")
    }

    if(appointmentCost === undefined || Number.isNaN(Number(appointmentCost))){
        throw new ApiError(400, "Please enter a valid cost")
    }

    let avatarLocalPath;

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const owner = req.user?._id;

    if(!owner){
        throw new ApiError(401, "Store not found")
    }

    const doctor = await Doctor.create(
        {
            fullName,
            email,
            phoneNumber,
            degree, 
            speciality,
            appointmentCost,
            arrivalTime,
            departureTime,
            owner,
            activeStatus,
            avatar: avatar?.url || "",
        }
    )

    if(!doctor){
        throw new ApiError(500, "Something went wrong while creating doctor")
    }

    const createdDoctor = await Doctor.findById(doctor._id);
    if(!createdDoctor){
        throw new ApiError(401, "Doctor couldn't be created")
    }
    

    return res.status(200)
              .json( new ApiResponse(
                200,
                createdDoctor,
                "Doctor created successfully"
              ))
})

const updateDoctorDetails = asyncHandler( async( req, res) => { 
    const doctor = req.model;

    if(!doctor){
        throw new ApiError(400, "Doctor not found")
    }

    const {fullName, appointmentCost, arrivaltTime, departureTime, activeStatus} = req.body;

    if(Object.keys(req.body).length === 0){
        throw new ApiError(400, "Some fields are required for updating")
    }

    if(fullName !== undefined) doctor.fullName = fullName;
    if(appointmentCost !== undefined) doctor.appointmentCost = appointmentCost;
    if(arrivaltTime !== undefined) doctor.arrivaltTime = arrivaltTime;
    if(departureTime !== undefined) doctor.departureTime = departureTime;
    if(activeStatus !== undefined) doctor.activeStatus = activeStatus;

    await doctor.save();

    return res.status(200)
              .json( new ApiResponse(200, doctor, "Doctor details updated successfully"))
})

const updateDoctorContactDetails = asyncHandler(async(req, res) => {
    const {email, phoneNumber} = req.body;

    const doctor = req.model;
    if(!doctor){
        throw new ApiError(401, "Doctor not found")
    }

    if(email !== undefined) doctor.email = email;
    if(phoneNumber !== undefined) doctor.phoneNumber = phoneNumber;

    if(Object.keys(req.body).length === 0){
        throw new ApiError(401, "Some fields are required for update")
    }
    
    await doctor.save();

    return res.status(200)
              .json( new ApiResponse(200, doctor, "Doctor contact details updated successfully"))

})

const updateDoctorAvatar = asyncHandler( async(req, res) => {
    const doctor = req.model;
    if(!doctor){
        throw new ApiError(401, "Doctor not found")
    }

    const avatarLocalPath = req.file?.path;
    if(!avatarLocalPath){
        throw new ApiError(401, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar.url){
        throw new ApiError(400, "Something went wrong while uploading on cloudinary")
    }

    doctor.avatar = avatar.url;

    await doctor.save();

    return res.status(200)
              .json(new ApiResponse(200, doctor, "Doctor avatar updated successfully"))
})

const getDoctor = asyncHandler(async(req, res) => {
    const {doctorId} = req.params;

    if(!doctorId) {
        throw new ApiError(401, "Unavailable request")
    }

    const doctor = await Doctor.findById(doctorId)

    if(!doctor){
        throw new ApiError(401, "No doctors were found")
    }

    return res.status(200)
              .json(new ApiResponse(200, doctor, "Doctor fetched successfully!"))
})

const deleteDoctor = asyncHandler( async(req, res) => {
    const doctor = req.model;
    if(!doctor){
        throw new ApiError(401, "Doctor not found")
    }

    await doctor.deleteOne();

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


