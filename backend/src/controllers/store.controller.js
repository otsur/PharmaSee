import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from "../models/store.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

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

const registerUser