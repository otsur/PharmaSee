import mongoose, {Schema} from "mongoose";

const reportSchema = new Schema(
    {
        reportFile: {
            type: String, // pdf
            required: true
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        },
        test: {
            type: Schema.Types.ObjectId,
            ref: "Test"
        },
        status: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export const Report = mongoose.model("Report", reportSchema)