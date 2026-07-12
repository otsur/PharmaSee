import mongoose, {Schema} from "mongoose";

const testSchema = new Schema(
    {
        testName: {
            type: String,
            required: true,
            unique: true,
        },
        isOpen: {
            type: String,
            enum: ["true", "flase"],
            default: "true"
        },
        description: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        }
    },
    {
        timestamps: true
    }
)

export const Test = mongoose.model("Test", testSchema)