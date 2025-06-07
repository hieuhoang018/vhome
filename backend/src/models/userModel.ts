import mongoose, { Document, Model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// 1. Define a User interface extending mongoose.Document
export interface IUser extends Document {
  _id: Types.ObjectId
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  cart: number[];
  firstName: string;
  lastName: string;
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

// 2. Define the schema
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm the password"],
      validate: {
        validator: function (this: IUser, el: string) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    phone: String,
    cart: {
      type: [Number],
      default: [],
    },
    firstName: {
      type: String,
      required: [true, "User must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "User must have a last name"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Add virtual
userSchema.virtual("fullName").get(function (this: IUser) {
  return this.firstName + " " + this.lastName;
});

// 4. Pre-save hook to hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 14);
  this.confirmPassword = undefined;
  next();
});

// 5. Instance method
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 6. Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
