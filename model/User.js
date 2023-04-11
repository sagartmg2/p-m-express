
const mongoose = require('mongoose');
const { SELLER, BUYER } = require('../constants/role');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                console.log({ value })
                let exists = await mongoose.models.User.findOne({ email: value })
                if (exists) {
                    return false
                }
            },
            message: "email already exists"
        }

    },
    role: {
        type: String,
        enum: [SELLER, BUYER],
        set: function (value) {
            return value.toLowerCase()
        }
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    }
});


module.exports = mongoose.model("User", UserSchema)

