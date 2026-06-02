import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        },
        price: {
            type: Number,
            required: true
        },
        booking: {
            type: String,
            enum: ["Test", "Doctor"],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Booking = mongoose.model("Booking", bookingSchema)