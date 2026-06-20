import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const customerSchema = new Schema({
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
                index: true
            },
            phoneNumber: {
                type: String,
                required: [true, "Phone number is required"],
                unique: true,
                trim: true,
            },
            email: {
                type: String,
                unique: true,
                required: true,
                lowercase: true,
                trim: true
            },
            fullName: {
                type: String,
                required: [true, "Full name is required"],
                trim: true,
                index: true
            },
            avatar: {
                type: String
            },
            password: {
                type: String,
                required: [true, "Password is mandatory"]
            },
            refreshToken: {
                type: String,
            }
        },
        {
            timestamps: true
        }
)

customerSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
})

customerSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

customerSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            phoneNumber: this.phoneNumber,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

customerSchema.methods.generateRefreshToken = function () {
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
 

export const Customer = mongoose.model("Customer", customerSchema)