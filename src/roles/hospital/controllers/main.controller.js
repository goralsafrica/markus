import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import Branch from "../../branch/models/Branch";
import { hashSync } from "bcryptjs";
import {
  deriveToken,
  serverError,
  badRequestError,
  successMessage,
} from "../../../utilities";

/**
 * @description Controller for all hospital - admin functions
 */

class HospitalController {
  static async create(user) {
    console.log(user);
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
      if (!createHospital) throw new Error("failed to create hospital");
      // creates partial details of a hospital branch
      const createBranch = Branch.create({
        branchName: "head branch",
        address: user.address,
        hospital: createHospital._id,
      });
      if (!createBranch) {
        await Hospital.findByIdAndDelete(createHospital._id);
        throw new Error("failed to create branch in hospital");
      }

      // create staff and store as an admin
      const createStaff = await Staff.create({
        firstName: user.adminFirstName,
        lastName: user.adminLastName,
        email: user.adminEmail,
        phone: user.adminPhone,
        role: {
          name: "chief medical director",
          category: "doctors",
        },
        administrativeRole: {
          name: "chief medical director",
        },
        code: user.hospitalCode + "-001",
        hospital: createHospital._id,
        password: user.password,
        priviledged: 1,
      });

      if (!createStaff) {
        console.log(createHospital._id, createBranch._id);
        await Hospital.findByIdAndDelete(createHospital._id);
        await Branch.findByIdAndDelete(createBranch._id);

        throw new Error("failed to create staff");
      }
      const token = deriveToken(createHospital._id, createStaff._id);

      // send mail
      return successMessage({ token }, "setup success");
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: err.message,
        },
        "setup failure"
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
