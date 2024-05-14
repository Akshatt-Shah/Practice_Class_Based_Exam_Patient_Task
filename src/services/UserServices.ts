import mongoose from "mongoose";
import users, { UserInterface } from "../models/Usermodel";
import { UserInter } from "../interface/UserInter";
import { ApiError } from "../error/CustomeError";
const Jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

export class UserServices {
  async createuser(userdata: UserInter) {
    userdata.password = await bcrypt.hash(userdata.password, 10);
    let data = await users.create(userdata);
    if (data) {
      return { Data: data, Status: true };
    } else {
      throw new ApiError(400, "User Not Created Please Provide Proper data");
    }
  }
  async updateuser(id: String, userdata: UserInter) {
    const data = await users.findByIdAndUpdate(id, userdata);
    if (data) {
      return { Message: "user Updated Successfully", Status: true };
    } else {
      throw new ApiError(400, "User Not Updated Please Provide Proper data");
    }
  }
  async getalluser() {
    const data = await users.find({});
    if (data) {
      return { Data: data, Status: true };
    } else {
      throw new ApiError(400, "User Not Available Please Add User");
    }
  }
  async getoneuser(id: any) {
    const data = await users.findById(id);
    if (data) {
      return { Data: data, Status: true };
    } else {
      throw new ApiError(400, "User Not Available Please Add User");
    }
  }
  async getlist(role: any) {
    const data = await users.find({ role: role });
    if (data) {
      return { Data: data, Status: true };
    } else {
      throw new ApiError(400, `${role} is  Not Available..............`);
    }
  }
  async deleteuser(id: any) {
    const data = await users.findByIdAndDelete(id);
    if (data) {
      return { Message: "user Deleted Successfully", Status: true };
    } else {
      throw new ApiError(400, "User Not Available!!!!!!!!!!!!!!!!!!!!!!!");
    }
  }
  async loginuser(name: any, password: any) {
    // console.log(name, password);
    const data = await users.find({ name: name });
    if (data) {
      const compare = await bcrypt.compare(password, data[0].password);
      if (compare) {
        const token = await Jwt.sign(
          { UserToken: data[0]._id },
          "your-secret-key",
          {
            expiresIn: "12h",
          }
        );
        return {
          Message: "user Login Successfully",
          Status: true,
          usertoken: token,
        };
      } else {
        // return { Message: "User Login Unsuccessful", Status: false };
        throw new ApiError(401, "Login Not Succesful");
      }
    } else {
      throw new ApiError(400, "User Not Available!!!!!!!!!!!!!!!!!!!!!!!");
    }
  }
  async SearchOrFilter(search: any, filter: any) {
    try {
      let matchobject: any = {};
      if (search) {
        let regex = new RegExp(search, "i");
        matchobject = {
          $or: [
            { role: regex },
            { email: regex },
            { name: regex },
            { password: regex },
            { speciality: regex },
          ],
        };
      }
      if (filter === "patient") {
        let regex = new RegExp(filter, "i");
        matchobject = {
          role: regex,
        };
      }
      if (filter === "doctor") {
        let regex = new RegExp(filter, "i");
        matchobject = {
          role: regex,
        };
      }
      if (filter === "receptionist") {
        let regex = new RegExp(filter, "i");
        matchobject = {
          role: regex,
        };
      }

      const data = await users.aggregate([
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "doctor_id",
        //     foreignField: "_id",
        //     as: "doctor_info",
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "users",
        //     localField: "patient_id",
        //     foreignField: "_id",
        //     as: "patient_info",
        //   },
        // },
        {
          $match: matchobject,
        },
        {
          $project: {
            _id: 1,
            role: 1,
            name: 1,
            password: 1,
            email: 1,
            speciality: 1,
            dob: 1,
          },
        },
      ]);
      return data;
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
