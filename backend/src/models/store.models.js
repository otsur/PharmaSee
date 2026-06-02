import mongoose, {Schema} from "mongoose";

const storeSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        ownerName: {
            type: String,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        avatar: {
            type: String,
            required: true
        },
        doctors: [
            {
                type: Schema.Types.ObjectId,
                ref: "Doctor"
            }
        ],
        openTime: {
            type: Date,
            required: true
        },
        closeTime: {
            type: Date,
            required: true
        },
        location: {
            placeName: {
                type: String,
                required: true
            },

            type: {
                type: String,
                enum: ["Point"],
                default: ["Point"]
            },

            coordinates: {
                type: [Number],
                required: true
            }
        },
        password: {
            type: String,
            required: [true, "Password is mandatory"],
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Store = mongoose.model("Store", storeSchema)