import mongoose from "mongoose";

const doctorSchema = new Schema(
    {
        phoneNumber: {
                type: String,
                required: [true, "Phone number is required"],
                trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true,
        },
        speciality: {
            type: String
        },
        activeStatus: {
            type: Boolean,
            default: true
        },
        appointmentCost: {
            type: Number,
            required: true,
            trim: true
        },
        arrivaltTime: {
            type: Date,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Doctor = mongoose.model("Doctor", doctorSchema)