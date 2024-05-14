import mongoose, { Schema, Document } from "mongoose";

// enum role {
//   Doctor = "doctor",
//   Patient = "patient",
// }

export interface UserInterface extends Document {
  role: String;
  email: String;
  name: String;
  password: String;
  speciality?: String;
  dob: Date;
  token?: String;
}

const UserSchema: Schema = new Schema({
  role: {
    type: String,
    enum: {
      values: ["doctor", "patient", "receptionist"],
      message: "{VALUE} is Not A Valid Role..",
    },
  },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  dob: { type: Date, required: true },
  token: { type: String },
});

export default mongoose.model<UserInterface>("user", UserSchema);
