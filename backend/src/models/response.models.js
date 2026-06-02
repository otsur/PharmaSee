import mongoose, {Schema} from 'mongoose';

const responseSchema = new mongoose.Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        textRequest: {
            type: Schema.Types.ObjectId,
            ref: 'TextRequest'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        }
    },
    {
        timestamps: true
    }
)

export const Response = mongoose.model("Response", responseSchema)