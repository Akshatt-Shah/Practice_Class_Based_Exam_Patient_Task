import mongoose from "mongoose";
import { Request, Response } from "express";
import users from "../models/Usermodel";
import { UserInter } from "../interface/UserInter";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { obj } from "../objects/AllObjects";
const object = new obj();
export class UserController {
  async createuser(req: Request, res: Response) {
    try {
      const userdata: UserInter = req.body;
      const data = await object.user.createuser(userdata);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async getalluser(req: Request, res: Response) {
    try {
      const data = await object.user.getalluser();
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async getoneuser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await object.user.getoneuser(id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async getlist(req: Request, res: Response) {
    try {
      const { role } = req.params;
      const data = await object.user.getlist(role);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async updateuser(req: Request, res: Response) {
    try {
      const userdata: UserInter = req.body;
      const id: String = req.params.id;
      const data = await object.user.updateuser(id, userdata);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async deleteuser(req: Request, res: Response) {
    try {
      const id: String = req.params.id;
      const data = await object.user.deleteuser(id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async loginuser(req: Request, res: Response) {
    try {
      const { name, password }: any = req.body;
      const data = await object.user.loginuser(name, password);
      res.cookie("UserToken", data.usertoken);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
  async SearchOrFilteruser(req: Request, res: Response) {
    try {
      const {search,filter}= req.query;
    
      const data = await object.user.SearchOrFilter(search,filter);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ Error: error.message, status: false });
    }
  }
}
