import mongoose, {Schema} from 'mongoose';

const responseSchema = new mongoose.Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            requird: true
        },
        owner: { // owner of a response is a store
            type: Schema.Types.ObjectId,
            ref: 'Store',
            requird: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            requird: true
        },
        reponse: {
            type: Boolean,
            required: true
        },
        reply: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Response = mongoose.model("Response", responseSchema)