import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyOwner = (Model) => {
    return asyncHandler( async(req, res, next) => {
        const modelId = req.params.id;
    
        if(!modelId){
            throw new ApiError(404, "Model id not provided")
        }

        const model = await Model.findById(modelId);
        if(!model){
            throw new ApiError(404, `Model not found`)
        }

        if(model.owner.toString() !== req.user?._id.toString()){
            throw new ApiError(402, "Unauthorized request")
        }

        req.model = model;

        next();
    })
}