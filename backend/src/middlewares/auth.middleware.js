import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.models.js";
import { Store } from "../models/store.models.js";

export const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        //console.log(token)
        //console.log("Type:", typeof token)

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        let user;
        if(decodedToken.role === "customer") {
            user = await Customer.findById(decodedToken?._id).select("-password -refreshToken")
        }
        else {
            user = await Store.findById(decodedToken?._id).select("-password -refreshToken")
        }

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next();
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})