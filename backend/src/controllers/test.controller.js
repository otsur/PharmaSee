import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Test } from "../models/test.models.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const createTest = asyncHandler(async(req, res) => {
    const { testName, activeStatus, description, cost } = req.body;

    if(
        [testName, description, cost].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All the fields are required")
    }

    if(activeStatus === undefined){
        throw new ApiError(400, "All the fields are required")
    }

    const store = req.user?._id;

    if(!store){
        throw new ApiError(401, "Store not found")
    }

    const test = await Test.create(
        {
            testName,
            activeStatus,
            description,
            cost
        }
    )

    if(!test){
        throw new ApiError(401, "Something went wrong while creating test")
    }

    const createdTest = await Test.findById(test._id);

    return res.status(200)
              .json(new ApiResponse(200, createdTest, "Test created successfully"))

})

const updateTest = asyncHandler(async(req, res) => {

    const test = req.model;
    if(!test){
        throw new ApiError(402, "Test not found")
    }

    const { testName, activeStatus, description, cost } = req.body;

    if(Object.keys(req.body).length === 0){
    throw new ApiError(401, "Some fields are required for update")
    }

    if(testName !== undefined) test.testName = testName;
    if(description !== undefined) test.description = description;
    if(cost !== undefined) test.cost = cost;
    if(activeStatus !== undefined) test.activeStatus = activeStatus;

    await test.save();

    return res.status(200)
            .json(new ApiResponse(200, test, "Test updated successfully"))
})

const getTest = asyncHandler( async(req, res) => {
    const { testId } = req.params;
    if(!testId){
        throw new ApiError(400, "Unavailable request")
    }

    const test = await Test.findById(testId);

    if(!test){
        throw new ApiError(401, "Test not found")
    }

    return res.status(200)
              .json( new ApiResponse(200, test, "Test fetched successfully"))
})

const deleteTest = asyncHandler( async(req, res) => {

    const test = req.model;
    if(!test){
        throw new ApiError(401, "Test not found")
    }

    await test.deleteOne();

    return res.status(200)
              .json(new ApiResponse(200, {}, "Test deleted successfully"))
})

// search

export {
    createTest,
    updateTest,
    getTest,
    deleteTest,
}