import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        createdAt: Date,
        phone: String,
        avatar: String,
        fullname: String,
        id: Number,
        password: {
            type: String,
            required: [true, 'Please provide password']
        },
        username: {
            type: String,
            required: [true, 'Please provide username'],
            unique: true
        },
        name: {
            first: String,
            last: String
        },
        status: String
    }, {
    collection: 'users'
}
)

const User = mongoose.model('User', userSchema);
export default User;