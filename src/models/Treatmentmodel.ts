import mongoose, { Schema, Document } from "mongoose";

export interface TreatmentInterface extends Document {
  patient_id: String;
  doctor_id: String;
  diseas: String;
  admit_date: Date;
  discharge_date?: Date;
  bill_amount: Number;
}

const TreatmentSchema: Schema = new Schema({
  patient_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  disease: { type: String, required: true },
  admit_date: { type: Date, required: true },
  discharge_date: { type: Date },
  bill_amount: { type: String, required: true },
});

export default mongoose.model<TreatmentInterface>(
  "treatments",
  TreatmentSchema
);
