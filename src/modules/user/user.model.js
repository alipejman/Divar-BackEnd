const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, required: false, default: 0}
});
const userSchema = new Schema({
    fullName: {type: String, required: false},
    mobile: {type: String, unique: true, required: true},
    otp: {type: OtpSchema},
    verifiedMobile: {type: Boolean, require: true, default: false}
}, {timestamps: true})

const userModel = model('user', userSchema);

module.exports = userModel;