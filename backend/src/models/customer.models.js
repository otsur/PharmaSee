import mongoose from "mongoose";

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


export const Customer = mongoose.model("Customer", customerSchema)