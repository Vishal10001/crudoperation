const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    studentname: { type: String, required: true },
    rollno: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    bdate: { type: String, required: true }
}, {
    versionKey: false
});

module.exports = mongoose.model("User", userSchema);
