import mongoose, {Schema} from "mongoose";

const testSchema = new Schema(
    {
        testName: {
            type: String,
            required: true,
            unique: true,
        },
        activeStatus: {
            type: Boolean
        },
        description: {
            type: String,
            required: true
        },
        bookingCost: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Test = mongoose.model("Test", testSchema)