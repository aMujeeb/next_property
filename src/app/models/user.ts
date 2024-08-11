import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, ' Email already exists']
    },
    username: {
        type: String,
        required: [true, 'UserName is required']
    },
    image: {
        type: String,
    },
    bookMarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, { timestamps: true }); //Will automatically create a createdAt and updatedAt fields

const User = models.User || model('User', UserSchema);
export default User;