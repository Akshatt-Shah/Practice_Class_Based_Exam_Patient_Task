import treatments, { TreatmentInterface } from "../models/Treatmentmodel";
import { TreatmentInter } from "../interface/TreatmentInter";
import users from "../models/Usermodel";

export class TreatmentServices {
  async CreateBill(data: TreatmentInter) {
    try {
      const patientid = await users.findById(data.patient_id);
      if (patientid?.role === "patient") {
        const doctorid = await users.findById(data.doctor_id);
        if (doctorid?.role === "doctor") {
          const Billdata = await treatments.create(data);
          console.log(Billdata);
          return { data: Billdata, status: true };
        } else {
          return { message: "Doctor Id  Is Not Available", status: false };
        }
      } else {
        return { message: "Patient Id Is Not Available", status: false };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async GetAllBill(id?: any) {
    try {
      if (id) {
        const Billdata: object | null = await treatments.findById(id);
        console.log(Billdata);
        return { data: Billdata, status: true };
      } else {
        const Billdata: object = await treatments.find();
        console.log(Billdata);
        return { data: Billdata, status: true };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async UpdateBill(billid: any, data: TreatmentInter) {
    try {
      const Billdata = await treatments.findByIdAndUpdate(billid, data);
      console.log(Billdata);
      return { data: Billdata, status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async DeleteBill(billid: any) {
    try {
      const Billdata = await treatments.findByIdAndDelete(billid);
      console.log(Billdata);
      return { message: "Bill Deleted Successfully", status: true };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async SearchAndFilterBill(
    pageno: any = 1,
    search?: any,
    doctor?: any,
    patient?: any,
    min: any = 0,
    max?: any,
    sdate?: any,
    edate?: any
  ) {
    try {
      let MatchObject: any = {};
      if (sdate) {
        sdate = new Date(sdate).toISOString();
        console.log(sdate);
        MatchObject["admit_date"] = {
          $gte: new Date(sdate),
        };
      }
      if (edate) {
        edate = new Date(edate).toISOString();
        MatchObject["discharge_date"] = {
          $lte: new Date(edate),
        };
      }
      if (min) {
        MatchObject["bill_amount"] = {
          ...MatchObject["bill_amount"],
          $gte: min,
        };
      }
      if (max) {
        MatchObject["bill_amount"] = {
          ...MatchObject["bill_amount"],
          $lte: max,
        };
      }

      if (!pageno && pageno === 0) {
        pageno = 1;
      }
      const limit = 5;
      let skip = (pageno - 1) * limit;
      if (skip <= 0) {
        skip = 1;
      }
      if (search) {
        console.log(search);
        let regex = new RegExp(search, "i");
        console.log(regex);

        MatchObject = {
          $or: [
            { "patientInfo.name": { $regex: search, $options: "i" } },
            { "doctorInfo.name": regex.toString() },
            { diseas: regex },
          ],
        };
      }

      if (doctor) {
        MatchObject["doctorInfo.name"] = {
          $regex: doctor,
          $options: "i",
        };
      }

      if (patient) {
        MatchObject["patientInfo.name"] = {
          $regex: patient,
          $options: "i",
        };
      }

      const data = await treatments
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "doctor_id",
              foreignField: "_id",
              as: "doctorInfo",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "patient_id",
              foreignField: "_id",
              as: "patientInfo",
            },
          },
          {
            $match: MatchObject,
          },
          {
            $skip: skip - 1,
          },
          {
            $limit: limit,
          },
          {
            $project: {
              _id: 1,
              patient: { $arrayElemAt: ["$patientInfo.name", 0] },
              Doctor: { $arrayElemAt: ["$doctorInfo.name", 0] },
              diseas: 1,
              admit_date: 1,
              discharge_date: 1,
              bill_amount: 1,
            },
          },
        ])
        .exec();
      // console.log("Data with doctorInfo and patientInfo:", data);

      console.log(MatchObject);
      return data;
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
