import mongoose from "mongoose";
import users, { UserInterface } from "../models/Usermodel";
import { UserInter } from "../interface/UserInter";
import { ApiError } from "../error/CustomeError";

export class UserServices {
  async createuser(userdata: UserInter) {
    const data = await users.create(userdata);
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
  async deleteuser(id: any) {
    const data = await users.findByIdAndDelete(id);
    if (data) {
      return { Message: "user Deleted Successfully", Status: true };
    } else {
      throw new ApiError(400, "User Not Available!!!!!!!!!!!!!!!!!!!!!!!");
    }
  }
}
