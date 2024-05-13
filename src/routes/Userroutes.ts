import { Router } from "express";
import { UserController } from "../controller/UserController";
import { validation } from "../middleware/DataValidator.Middlware";
const validate = new validation();
const user = new UserController();

const userroute = Router();

userroute.post("/user/createuser", validate.UserValidate, user.createuser);

userroute.post("/user/loginuser", user.loginuser);

userroute.get("/user/GetAllUser", user.getalluser);

userroute.get("/user/GetOneUser/:id", user.getoneuser);

userroute.put("/user/updateuser/:id", validate.UserValidate, user.updateuser);

userroute.delete("/user/deleteuser/:id", user.deleteuser);

export default userroute;
