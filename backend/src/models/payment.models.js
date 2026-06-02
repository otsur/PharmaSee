import mongoose, {Schema} from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        booking: {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'INR',
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['Card', 'UPI', 'NetBanking', 'Wallet', 'Cash'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending',
            required: true
        },
        transactionId: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
)

export const Payment = mongoose.model("Payment", paymentSchema)