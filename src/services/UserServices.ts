import mongoose from "mongoose";
import users, { UserInterface } from "../models/Usermodel";
import { UserInter } from "../interface/UserInter";
import { ApiError } from "../error/CustomeError";
const bcrypt = require("bcrypt");

export class UserServices {
  async createuser(userdata: UserInter) {
    let data = await users.create(userdata);
    data.password = await bcrypt.hash(data.password, 10);
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
  async deleteuser(id: any) {
    const data = await users.findByIdAndDelete(id);
    if (data) {
      return { Message: "user Deleted Successfully", Status: true };
    } else {
      throw new ApiError(400, "User Not Available!!!!!!!!!!!!!!!!!!!!!!!");
    }
  }
  async loginuser(name: any, password: any) {
    const data = await users.find({ name: name });
    if (data) {
      const compare = await bcrypt.compare(password, data[0].password, 10);
      if (compare) {
        return { Message: "user Login Successfully", Status: true };
      } else {
        return { Message: "user Login UnSuccessful", Status: false };
      }
    } else {
      throw new ApiError(400, "User Not Available!!!!!!!!!!!!!!!!!!!!!!!");
    }
  }
}
