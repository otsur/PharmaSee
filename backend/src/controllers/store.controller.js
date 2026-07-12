import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from "../models/store.models.js";
import { Doctor } from "../models/doctor.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Test } from "../models/test.models.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const store = await Store.findById(userId)
        const accessToken = store.generateAccessToken()
        const refreshToken = store.generateRefreshToken()

        store.refreshToken = refreshToken
        await store.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(
                    500, 
                    "Something went wrong while generating refresh and access tokens"
                 )
    }
}

const registerUser = asyncHandler( async(req, res) => {
    const {username, ownerName, email, phoneNumber, openTime, closeTime, password} = req.body;
    if(
        [username, ownerName, email, phoneNumber, openTime, closeTime, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All the fields are required")
    }

    const existedUsername = await Store.findOne({username});
    const existedPhoneNumber = await Store.findOne({phoneNumber});
    const existedEmail = await Store.findOne({email});

    if(existedEmail) {
        throw new ApiError(409, "This email is already registered")
    }

    if(existedPhoneNumber) {
        throw new ApiError(409, "This phone number is already registered")
    }

    if(existedUsername) {
        throw new ApiError(409, "This username is already taken")
    }
    
    
    const avatarLocalPath = req.file?.path;
    

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(400, "Something went wrong while uploading on cloudinary")
    }

    const location = JSON.parse(req.body.location)

    if(!location ||
        !location.placeName?.trim() ||
        location.type !== "Point" ||
        !Array.isArray(location.coordinates)||
        location.coordinates.length !== 2 
    ){
        throw new ApiError(401, "Location is required")
    }

    const store = await Store.create({
        username: username.toLowerCase(),
        ownerName,
        email,
        password,
        phoneNumber,
        closeTime,
        openTime,
        avatar: avatar?.url,
        location
    })

    const createdStore = await Store.findById(store._id).select("-password -refreshToken")

    if(!createdStore){
        throw new ApiErro(500, "Something went wrong while registering Store")
    }

    return res.status(200)
              .json( new ApiResponse(
                200,
                createdStore,
                "User registered successfully"
              ))
})

const loginUser = asyncHandler( async(req, res) => {
    const {username, email, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "Username or email is required for login")
    }

    const store = await Store.findOne({
        $or: [{username}, {email}]
    })
    if(!store){
        throw new ApiError(400, "Store doesn't exist")
    }

    const isPasswordValid = await store.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(400, "Incorrect password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(store._id)

    const loggedInUser = await Store.findById(store._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json( new ApiResponse(
                200,
                {
                    store: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
              ))

})

const logoutUser = asyncHandler( async(req, res) => {
    await Store.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            returnDocument: "after"
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
              .clearCookie("accessToken", options)
              .clearCookie("refreshToken", options)
              .json(new ApiResponse(
                200,
                {},
                "User logged out"
              ))
})

const refreshAccessToken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const store = await Store.findById(decodedToken?._id)

        if(!store){
            throw new ApiError(401, "Invalid refresh token")
        }

        if(incomingRefreshToken !== store?.refreshToken){
            throw new ApiError(401, "Refresh token has expired or is used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(store._id)

        return res.status(200)
                  .cookie("accessToken", accessToken, options)
                  .cookie("refreshToken", refreshToken, options)
                  .json( new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshed"
                  ))
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword} = req.body
    console.log("reached here");
    

    const store = await Store.findById(req.user?._id) 

    const isPasswordCorrect = await store.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid password")
    }

    store.password = newPassword

    await store.save({validateBeforeSave: false})

    return res.status(200)
              .json(new ApiResponse(
                200,
                {},
                "Password changed successfully"
              ))
})

const getCurrentStore = asyncHandler( async(req, res) => {

    return res.status(200)
              .json( new ApiResponse(
                200,
                req.user,
                "Current store retrieved successfully"
              ))
})

const updateUserAvatar = asyncHandler( async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, "Error while uploading in Cloudinary")
    }

    const store = await Store.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200)
              .json( new ApiResponse(
                200,
                store,
                "Avatar updated successfully"
              ))
})

const updateContactDetails = asyncHandler( async(req, res) => {
    const {email, phoneNumber} = req.body;

    if(!email || !phoneNumber){
        throw new ApiError(401, "All the fields are required")
    }

    const store = await Store.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                email,
                phoneNumber
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200)
              .json( new ApiResponse(
                200,
                store,
                "Contact details updated successfully"
              ))
})

const updateUsername = asyncHandler( async(req, res) => {
    const username = req.body;
    if(username && username._id  !== req.user?._id){

        const existedUser = await Store.findOne({username});
        if(existedUser){
            throw new ApiError(401, "Username already taken")
        }

        const store = await Store.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    username
                }
            },
            {
                new: true
            }
        ).select("-password")
    }else {
        throw new ApiError(401, "Enter a new username")
    }

    return res.status(200)
              .json(new ApiResponse(
                200,
                store,
                "Username updated successfully"
              ))
})

const updateStoreDetails = asyncHandler( async(req, res) => {
    const {ownerName, openTime, closeTime, location} = req.body;

    if(
        [ownerName,openTime,closeTime].some((field) => field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    if(!location ||
        !location.placeName?.trim() ||
        !location.coordinates ||
        location.coordinates.length !== 2
    ){
        throw new ApiError(400, "Location is required")
    }

    const store = await Store.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                ownerName,
                openTime,
                closeTime,
                location
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200)
              .json(new ApiResponse(
                200,
                store,
                "Store details updated successfully"
              ))
})

const getDoctors = asyncHandler( async(req, res) => {
    const {storeId} = req.params;

    const doctors = await Doctor.find(
        {
            owner: storeId
        }
    )

    if(!doctors){
        throw new ApiError("Doctors unavailable")
    }

    return res.status(200)
              .json(new ApiResponse(200, doctors, "Doctors fetched successfully"))
})

const getStore = asyncHandler( async(req, res) => {
    const {storeId} = req.params;
    if(!storeId){
        throw new ApiError(401, "No request")
    }

    const store = await Store.findById(storeId).select("-password -refreshToken")
    if(!store){
        throw new ApiError(401, "Store not found")
    }

    return res.status(200)
              .json(new ApiResponse(200, store, "Store fetched successfully"))

})

const getTests = asyncHandler( async(req, res) => {
    const {storeId} = req.params;

    const tests = await Test.find(
        {
            owner: storeId
        }
    )

    if(!tests){
        throw new ApiError("Tests unavailable")
    }

    return res.status(200)
              .json(new ApiResponse(200, tests, "Tests fetched successfully"))
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentStore,
    updateUserAvatar,
    updateContactDetails,
    updateUsername,
    updateStoreDetails,
    getDoctors,
    getStore,
    getTests
}