import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import { hashSync } from "bcryptjs";
import { deriveToken, serverError } from "../../../utilities";

/**
 * @description Controller for all hospital - admin functions
 */

class HospitalController {
  static async create(user) {
    // hash password
    user.password = hashSync(user.password, 10);
    try {
      //create new Hospital first
      const createHospital = await Hospital.create({
        name: user.hospitalName,
        email: user.hospitalEmail,
        phone: user.hospitalPhone,
        slug: user.slug,
      });

      // create staff and store as an admin
      const createStaff = await Staff.create({
        firstName: user.adminFirstName,
        lastName: user.adminLastName,
        email: user.adminEmail,
        phone: user.adminPhone,
        department: "5f5f2e592efb0a2bc448d5c4",
        role: "5f5b6c7cbecfefabaefe913f",
        hospital: createHospital._id,
        password: user.password,
        priviledged: 1,
      });
      if (!createHospital || !createStaff) return Promise.reject("error");

      const token = deriveToken(createHospital._id, createStaff._id);
      return Promise.resolve({
        status: 200,
        result: {
          data: {
            token,
          },
          errors: null,
          message: "hospital has been created successfully",
        },
      });
    } catch (err) {
      console.error(err);
      return Promise.resolve(
        serverError(
          { request: "server failed to respond" },
          "failed to create new hospital"
        )
      );
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
