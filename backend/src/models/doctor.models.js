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
            //required: true
        },
        degree: {
            type: String,
            required: true,
            enum: ["MBBS", "MD", "MS", "DM", "BDS", "other"]
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
            type: String,
            required: true
        },
        departureTime: {
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

export const Doctor = mongoose.model("Doctor", doctorSchema)