import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import { hashSync } from "bcryptjs";
import * as utils from "../../utilities";

/**
 * @description Controller for all hospital - admin functions
 */

class HospitalController {
  static async create(req, res, next) {
    // hash password
    req.body.password = hashSync(req.body.password, 10);
    try {
      //create new Hospital first
      const createHospital = await Hospital.create({
        name: req.body.hospitalName,
        email: req.body.hospitalEmail,
        phone: req.body.hospitalPhone,
        slug: req.body.slug,
      });

      // create staff and store as an admin
      const createStaff = await Staff.create({
        firstName: req.body.adminFirstName,
        lastName: req.body.adminLastName,
        email: req.body.adminEmail,
        phone: req.body.adminPhone,
        department: "5f5f2e592efb0a2bc448d5c4",
        role: "5f5b6c7cbecfefabaefe913f",
        hospital: createHospital._id,
        password: req.body.password,
        priviledged: 1,
      });
      if (!createHospital || !createStaff) return Promise.reject("error");

      const token = utils.deriveToken(createHospital._id, createStaff._id);

      res.json({
        data: token,
        errors: null,
        message: "Hospital and admin accounts have been created successfully",
      });
      // res.send({
      //   mesaage: "new hospital created",
      // });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "account not created"]);
    }
  }

  static async findOne(req, res, next) {
    const { hospital } = req.body.credentials;
    try {
      const data = await Hospital.findById(hospital);

      if (!data) next([400, ["invalid hospital id"], "hospital not found"]);
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
