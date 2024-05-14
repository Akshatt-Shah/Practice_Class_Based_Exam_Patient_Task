const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import users, { UserInterface } from "../models/Usermodel";

export class VerifyToken {
  async verifyReceptionist(req: Request, res: Response, next: NextFunction) {
    try {
      const ReceptionistData = req.cookies.UserToken;
      const usertoken = jwt.verify(ReceptionistData, "your-secret-key");

      const data: any | null = await users.findById(usertoken.UserToken);
      console.log(data);
      if (data.role === "receptionist") {
        next();
      } else {
        res.status(400).json({
          message: "Only Receptionist Can make the bill......",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}
