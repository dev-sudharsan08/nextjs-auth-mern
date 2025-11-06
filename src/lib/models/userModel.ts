import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      lowercase: true,
      index: false, // Explicitly disable indexing for username
    },
    email: {
      type: String,
      required: [true, 'Please provide a email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null
    },
    emailVerificationToken: {
      type: String,
      default: null
    },
    emailVerificationTokenExpiry: {
      type: Date,
      default: null
    },
    refreshToken: {
      type: String,
      default: null
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now
    },
    profilePicture: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/43'
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;