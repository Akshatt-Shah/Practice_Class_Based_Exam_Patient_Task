enum role {
  Doctor = "doctor",
  Patient = "patient",
}

export interface UserInter {
  _id?: String;
  role: role;
  email: String;
  name: String;
  password: String;
  speciality?: String;
  dob: Date;
  token?: String;
}
