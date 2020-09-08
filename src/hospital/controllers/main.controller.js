import Hospital from "../models";
//import { hashSync } from "bcryptjs";
class HospitalController {
  static async create(req, res, next) {
    const { name, email, phoneNumber, password } = req.body;
    try {
      const newHospital = new Hospital({ name, email, phoneNumber, password });
      const success = await newHospital.save();

      if (!success) return Promise.reject("error handling request");
      res.send({
        mesaage: "new hospital created",
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }

  static async findOne(req, res, next) {
    try {
      const data = await Hospital.findById("5f526382b0f4fb35f2bd82e2");

      if (!data) return Promise.reject("error handling request");
      res.send({
        data,
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }

  static async update(req, res, next) {
    try {
      const data = await Hospital.findByIdAndUpdate(
        "5f526382b0f4fb35f2bd82e2",
        {
          email: req.body.email,
          name: req.body.name,
        },
        { new: true, useFindAndModify: false }
      );

      if (!data) return Promise.reject("error handling request");
      res.send({
        data,
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }
}

export default HospitalController;
