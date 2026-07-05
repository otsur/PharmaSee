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
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: Store
        }
    },
    {
        timestamps: true
    }
)

export const Test = mongoose.model("Test", testSchema)