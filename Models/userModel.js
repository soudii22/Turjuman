const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User Must Have a Name!"],
      minlength: 3,
      maxlength: 32,
      unique: false,
    },
    email: {
      type: String,
      required: [true, "User Must Have an E-Mail!"],
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address!",
      },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 7,
      maxlength: 17,
      select: false,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
    },
    passwordConfirm: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
      validate: {
        validator: function (el) {
          return this.isModified("password") ? el === this.password : true;
        },
        message: "Passwords are not the same!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    dailyTranslations: {
      count: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
    photo: {
      type: String,
      default: "default.png",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    loginMethod: {
      type: String,
      enum: ["google", "facebook", "local"],
      default: "local",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },

  { timestamps: true }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.ChangedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const ChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < ChangedTimestamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createEmailVerifyToken = function () {
  const verifyToken = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 10 * 60 * 1000;
  return verifyToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
