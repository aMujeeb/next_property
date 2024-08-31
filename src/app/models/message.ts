import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    property: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String
    },
    body: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); //Will automatically create a createdAt and updatedAt fields

const Message = models.Message || model('Message', MessageSchema);
export default Message;