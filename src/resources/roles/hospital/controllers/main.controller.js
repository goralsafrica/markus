import Hospital from "../models/Hospital";
import Staff from "../../staff/models/Staff";
import Branch from "../../branch/models/Branch";
import StaffWorkspace from "../../staff/models/StaffWorkspace";
import TemporaryData from "../../../auth/models/TemporaryData";
import { sendMail } from "../../../notifications";
import { hashSync } from "bcryptjs";
import {
  deriveToken,
  serverError,
  badRequestError,
  successMessage,
  randomNumber,
} from "../../../../utilities";

/**
 * @description Controller for all hospital - admin functions
 */

class HospitalController {
  static async create(user) {
    // hash password
    user.password = hashSync(user.password, 10);
    const verificationCode = randomNumber(6);
    console.log(verificationCode);
    try {
      //create new hospital
      const createHospital = await Hospital.create({
        name: user.hospitalName,
        email: user.hospitalEmail,
        phone: user.hospitalPhone,
        url: user.url,
        code: user.hospitalCode,
      });
      // creates partial details of a hospital branch
      const createBranch = await Branch.create({
        branchName: "head branch",
        address: user.address,
        hospital: createHospital._id,
      });
      // create new staff
      const createStaff = await Staff.create({
        title: user.title,
        firstName: user.adminFirstName,
        lastName: user.adminLastName,
        email: user.adminEmail,
        phone: user.adminPhone,
        password: user.password,
      });

      await StaffWorkspace.create({
        staff: createStaff._id,
        hospital: createHospital._id,
        role: {
          name: "chief medical director",
          category: "doctor",
        },
        branches: [createBranch._id],
        administrativeRole: {
          name: "chief medical director",
        },
      });
      const token = deriveToken(createHospital._id, createStaff._id, true);

      sendMail(
        "Account Verification",
        "noreply@goralsafrica.com",
        [user.adminEmail],
        {
          code: verificationCode,
          fullName: createStaff.firstName + " " + createStaff.lastName,
          title: createStaff.title,
        },
        "verify-signup.hbs"
      )
        .then(console.log)
        .catch(console.log);

      await TemporaryData.create({
        staff: createStaff._id,
        type: "verification_code",
        verificationCode,
        createdAt: new Date(),
      });

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
