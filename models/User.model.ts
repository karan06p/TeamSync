import mongoose, { Schema } from "mongoose";

export interface User extends Document{
  username: string;
  email: string;
  password: string;
  verificationCode: string;
  expiresIn: Date;
  isVerified: boolean;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode:{
    type: String,
    required: true
  },
  expiresIn:{
    type: Date,
    required: true
  }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||  mongoose.model<User>("User", UserSchema);

export default UserModel;
