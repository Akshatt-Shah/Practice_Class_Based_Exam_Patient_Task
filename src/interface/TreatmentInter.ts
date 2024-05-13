export interface TreatmentInter {
  _id?: String;
  patient_id: String;
  doctor_id: String;
  diseas: String;
  admit_date: Date;
  discharge_date?: Date;
  bill_amount: Number;
}
