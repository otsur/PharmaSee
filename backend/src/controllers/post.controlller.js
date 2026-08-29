import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.models.js";
import { TextRequest } from "../models/textRequest.models.js";
import { Store } from "../models/store.models.js";
import { notifyStores } from "../utils/firebase.js";

const getNearbyStoreFcmTokens = async (coordinates) => {
    const stores = await Store.find({
        location: {
            $near: {
                $geometry: { type: "Point", coordinates },
                $maxDistance: 5000
            }
        }
    }).select("fcmToken");

    return stores.map((s) => s.fcmToken);
};

const createPost = asyncHandler(async (req, res) => {
    const { description, coordinates } = req.body;

    if (!coordinates || !Array.isArray(JSON.parse(coordinates)) || JSON.parse(coordinates).length !== 2) {
        throw new ApiError(400, "Valid coordinates [lng, lat] are required");
    }

    const parsedCoords = JSON.parse(coordinates);
    

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "An image is required for Post");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(500, "Something went wrong while uploading to cloudinary");
    }

    const owner = req.user?._id;
    if (!owner) {
        throw new ApiError(401, "Unauthorized request");
    }

    const post = await Post.create({
        image: image?.url || "",
        description,
        owner
    });

    if (!post) {
        throw new ApiError(500, "Something went wrong while creating post");
    }

    const createdPost = await Post.findById(post._id);
    if (!createdPost) {
        throw new ApiError(500, "Post couldn't be created");
    }

    const tokens = await getNearbyStoreFcmTokens(parsedCoords);
    await notifyStores(tokens, "New Prescription Posted", "A customer near you posted a prescription.");

    return res.status(200).json(new ApiResponse(200, createdPost, "Post created successfully"));
});

const createTextRequest = asyncHandler(async (req, res) => {
    const { text, coordinates } = req.body;

    if (!text) {
        throw new ApiError(400, "Text is required");
    }

    if (!coordinates || !Array.isArray(JSON.parse(coordinates)) || JSON.parse(coordinates).length !== 2) {
        throw new ApiError(400, "Valid coordinates [lng, lat] are required");
    }

    const parsedCoords = JSON.parse(coordinates);

    const owner = req.user?._id;
    if (!owner) {
        throw new ApiError(401, "Unauthorized request");
    }

    const textRequest = await TextRequest.create({ description: text, owner });
    if (!textRequest) {
        throw new ApiError(500, "Text request couldn't be created");
    }

    const createdTextRequest = await TextRequest.findById(textRequest._id);
    if (!createdTextRequest) {
        throw new ApiError(500, "Something went wrong while creating text request");
    }

    const tokens = await getNearbyStoreFcmTokens(parsedCoords);
    await notifyStores(tokens, "New Medicine Request", "A customer near you is looking for a medicine.");

    return res.status(200).json(new ApiResponse(200, createdTextRequest, "Text request created successfully"));
});

export {
    createPost,
    createTextRequest,
};
