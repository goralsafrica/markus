import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import { hashSync } from "bcryptjs";
import { deriveToken, serverError, badRequestError } from "../../../utilities";

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
        url: user.url,
        code: user.hospitalCode,
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

  static async findOne({ hospital, staff }) {
    try {
      const data = await Hospital.findById(hospital);
      if (!data)
        return Promise.resolve(
          badRequestError(
            {
              hospital: "invalid hospital id",
            },
            "failed to fetch hospital"
          )
        );
      return Promise.resolve({
        status: 200,
        result: {
          data,
          errors: null,
          message: "hospital found",
        },
      });
    } catch (err) {
      return Promise.resolve(
        serverError(
          {
            request: "server failed to respond",
          },
          "failed to fetch hospital"
        )
      );
    }
  }

  static async update({ body, credentials }) {
    try {
      const data = await Hospital.findByIdAndUpdate(
        credentials.hospital,
        {
          email: body.email,
          name: body.name,
          phone: body.phone,
        },
        { new: true }
      );
      if (!data) return Promise.reject("error handling request");
      return {
        status: 200,
        result: {
          data,
          errors: null,
          message: "hospital details have been successfully updated",
        },
      };
    } catch (err) {
      console.error(err);
      return serverError(
        { request: "server failed to respond" },
        "failed to update hospital data"
      );
    }
  }
}

export default HospitalController;
