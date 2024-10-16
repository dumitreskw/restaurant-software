import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { addressSchema } from "./address.js";

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters long"], select: false},
    avatar: { public_id: String, url: String },
    createdAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    role: { type: String, default: "USER" },
    addresses: [addressSchema],
    otp: Number,
    resetPassword_otp: Number,
    otp_expiry: Date,
    resetPassword_otp_expiry: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.name, role: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
        }
    );
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
