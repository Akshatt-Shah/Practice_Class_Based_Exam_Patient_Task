import { UserSchema } from "../ValidationSchema/DataValidationSchema";
import { Request, Response, NextFunction } from "express";

export class validation {
  async UserValidate(req: Request, res: Response, next: NextFunction) {
    try {
      await UserSchema.validate(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}
