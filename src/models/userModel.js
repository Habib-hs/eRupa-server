const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean,
        default: false
    },
     history: {
      type: Array,
      default: [],
    },

    location: {
        type: String
    },

    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;