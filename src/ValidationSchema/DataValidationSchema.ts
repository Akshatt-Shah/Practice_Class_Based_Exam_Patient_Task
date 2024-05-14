import * as Yup from "yup";
export const UserSchema = Yup.object().shape({
  role: Yup.string().required(),
  email: Yup.string()
    .required()
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{3,}$/, "Email Must Be Valid"),
  name: Yup.string().required().min(4),
  password: Yup.string()
    .required()
    .min(4)
    .matches(
      /^[A-Z][a-z0-9A-Z]/,
      "Password Muyst Start With Capital Character And Atleast $ character"
    ),
  speciality: Yup.string(),
  dob: Yup.date().required(),
});

export const TreatmentSchema = Yup.object().shape({
  patient_id: Yup.string().required(),
  doctor_id: Yup.string().required(),
  diseas: Yup.string().required(),
  admit_date: Yup.date().required(),
  discharge_date: Yup.date().required(),
  bill_amount: Yup.number().required(),
});
