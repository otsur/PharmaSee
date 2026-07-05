import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Customer } from "../models/customer.models.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { Post } from "../models/post.models.js";

const createPost = asyncHandler(async(req, res) => {
    const {description} = req.body;
    const imageLocalPath = req.file?.path;
    if(!imageLocalPath){
        throw new ApiError(400, "An image is required for Post")
    }

    const image = await uploadOnCloudinary(imageLocalPath)
    if(!image){
        throw new ApiError(404, "Something went wrong while uploading to cloudinary")
    }

    const owner = req.user?._id;
    if(!owner){
        throw new ApiError(404, "Unauthorized request")
    }

    const post = await Post.create({
        image: image?.url || "",
        description,
        owner
    })

    if(!post){
        throw new ApiError(404, "Something went wrong while creating post")
    }

    const createdPost = await Post.findById(post._id);

    if(!createdPost){
        throw new ApiError(400, "Post couldn't be created")
    }

    return res.status(200)
              .json(new ApiResponse(200, createdPost, "Post created successfully"))


})

const createTextRequest = asyncHandler(async(req, res) => {
    const {text} = req.body;
    if(!text){
        throw new ApiError(401, "Text is required")
    }

    const owner = req.user?._id;
    if(!owner){
        throw new ApiError(404, "Unauthorized request")
    }

    const textRequest = await Post.create({text, owner})
    if(!textRequest){
        throw new ApiError(401, "Text request couldn't be created")
    }

    const createdTextRequest = await Post.findById(textRequest._id);
    if(!createdTextRequest){
        throw new ApiError(404, "Something went wrong while creating Text request")
    }

    return res.status(200)
              .json(200, createdTextRequest, "Text request created successfully")
})



export {
    createPost,
    createTextRequest,
}





// populate()  
/*
const post = await Post.find().populate("customer (or other fields such as store with a space in between)", "which ever fields you want to show (with spaces in between)")

const post = await Post.find().populate({
    path: Customer, // (name of the field)
    match: {name: "nomnom"}, // (search those who matches this )
    select: "username" // select only this // or "-password" -> do no select this
})

with no populte -> only customer id will be shown
 */