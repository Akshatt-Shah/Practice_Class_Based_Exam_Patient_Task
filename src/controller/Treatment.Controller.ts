import treatments, { TreatmentInterface } from "../models/Treatmentmodel";
import { TreatmentInter } from "../interface/TreatmentInter";
import { TreatmentServices } from "../services/Treatment.services";
const Tretmentservice = new TreatmentServices();
import mongoose from "mongoose";
import { Request, Response } from "express";

export class TreatmentController {
  async createbill(req: Request, res: Response) {
    try {
      const data: TreatmentInter = req.body;
      console.log(data);
      const billdata = await Tretmentservice.CreateBill(data);
      console.log(billdata);
      res.json(billdata);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
  async getallbill(req: Request, res: Response) {
    try {
      const { billid } = req.query;
      const billdata = await Tretmentservice.GetAllBill(billid);
      console.log(billdata);
      res.json(billdata);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
  async updatebill(req: Request, res: Response) {
    try {
      const data: TreatmentInter = req.body;
      const { billid } = req.query;
      const billdata = await Tretmentservice.UpdateBill(billid, data);
      console.log(billdata);
      res.json(billdata);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
  async deletebill(req: Request, res: Response) {
    try {
      const { billid } = req.query;
      const billdata = await Tretmentservice.DeleteBill(billid);
      console.log(billdata);
      res.json(billdata);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
  async searchandfilterbill(req: Request, res: Response) {
    try {
      const { search, doctor, patient,pageno,min,max,sdate,edate } = req.query;
      const billdata = await Tretmentservice.SearchAndFilterBill(
        pageno,
        search,
        doctor,
        patient,
        min,
        max,
        sdate,
        edate
      );
      // console.log(billdata);
      res.json(billdata);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
}
