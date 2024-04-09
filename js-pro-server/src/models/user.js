const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    secondName: String,
    nickname: String,
    email: String,
    password: String,
    image: String,
    role: {
        type: String,
        enum: ["admin", "viewer"],
        default: "viewer",
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
