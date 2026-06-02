import mongoose, {Schema} from "mongoose";

const textRequestSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export const TextRequest = mongoose.model("TextRequest", textRequestSchema)