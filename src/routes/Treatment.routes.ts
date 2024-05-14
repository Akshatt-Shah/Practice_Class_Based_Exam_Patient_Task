import { TreatmentController } from "../controller/Treatment.Controller";
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";
import { validation } from "../middleware/DataValidator.Middlware";
const TreatmentValidator = new validation();
const verify = new VerifyToken();
const Treatment = new TreatmentController();
const Trouter = Router();

Trouter.post(
  "/treatment/CreateTreatment",
  verify.verifyReceptionist,
  TreatmentValidator.TreatmentValidate,
  Treatment.createbill
);

Trouter.post(
  "/treatment/SearchAndFilterTreatment",
  Treatment.searchandfilterbill
);
Trouter.get(
  "/treatment/GetAllTreatmentBill",
  verify.verifyReceptionist,
  Treatment.getallbill
);
Trouter.put(
  "/treatment/UpdateTreatment",
  verify.verifyReceptionist,
  TreatmentValidator.TreatmentValidate,
  Treatment.updatebill
);
Trouter.delete(
  "/treatment/DeleteTreatment",
  verify.verifyReceptionist,
  Treatment.deletebill
);

export default Trouter;
