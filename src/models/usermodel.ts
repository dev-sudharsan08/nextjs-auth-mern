import mongoose from 'mongoose';

// // Drop the existing unique index on username if it exists
// async function dropUsernameIndex() {
//   try {
//     const collections = await mongoose.connection.db?.collections();
//     const usersCollection = collections?.find(c => c.collectionName === 'users');
//     if (usersCollection) {
//       await usersCollection.dropIndex('username_1');
//     }
//   } catch (error) {
//     // Index might not exist, which is fine
//     console.log('No existing username index to drop');
//   }
// }

// // Call this function when the connection is ready
// mongoose.connection.once('connected', () => {
//   dropUsernameIndex();
// });

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
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;