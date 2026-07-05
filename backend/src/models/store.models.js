import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        openTime: {
            type: String,
            required: true
        },
        closeTime: {
            type: String,
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
            required: true,
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

storeSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

storeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

storeSchema.methods.generateAccessToken = function() {
    return jwt.sign(
            {
                _id: this._id,
                username: this.username,
                emai: this.email,
                role: "store",
                phoneNumber: this.phoneNumber
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}

storeSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
            {
                _id: this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
}

export const Store = mongoose.model("Store", storeSchema)