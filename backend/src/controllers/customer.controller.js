import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Customer } from "../models/customer.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await Customer.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return {
                accessToken,
                refreshToken
               }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    const {username, phoneNumber, fullName, password, email} = req.body

    if(
        [fullName, phoneNumber, username, password, email].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //   CHECKING UNIQUE USERNAME AND PHONE NUMBER
    const existedUserName = await Customer.findOne({
        username
    })

    const existedPhoneNumber = await Customer.findOne({
        phoneNumber
    })

    const existedEmail = await Customer.findOne({
        email
    })

    if(existedUserName) {
        throw new ApiError(409, "This username is already taken")
    }

    if(existedEmail) {
        throw new ApiError(409, "This email is already registered")
    }

    if(existedPhoneNumber) {
        throw new ApiError(409, "This phone number is already registered")
    }
    //-----------------------------------------------

    let avatarLocalPath;

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatar = req.files.avatar[0].path
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    // customer object for returning
    const customer = await Customer.create({
        fullName,
        avatar: avatar?.url || "",
        email,
        password,
        username: username.toLowerCase(),
        phoneNumber
    })

    const createdCustomer = await Customer.findById(customer._id).select(
        "-password -refreshToken"
    )

    if(!createdCustomer) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdCustomer, "User registered successfully")
    )
    
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body

    if(!(username || email)) {
        throw new ApiError(400, "username or email is required")
    }

    const customer = await Customer.findOne({
        $or: [{username}, {email}]
    })

    if(!customer) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await customer.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Incorrect password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(customer._id)

    const loggedInUser = await Customer.findById(customer._id).select("-password -refreshToken")

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
                                user: loggedInUser, accessToken, refreshToken
                            },
                            "User logged in Successfully"
                        ))
})

const logoutUser = asyncHandler( async (req, res) => {
    await Customer.findByIdAndUpdate(
        req.user._id,
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
              .cookie("accessToken", options)
              .cookie("refreshToken", options)
              .json( new ApiResponse(200, {}, "User logged out"))
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

        const customer = await Customer.findById(decodedToken?._id)

        if(!customer){
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if(incomingRefreshToken !== customer?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(customer._id)

        return res.status(200)
                  .cookie("accessToken", accessToken, options)
                  .cookie("refreshToken", newRefreshToken, options)
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

    const customer = await Customer.findById(req.user?._id) 
})


export {
     
}