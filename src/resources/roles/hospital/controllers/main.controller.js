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
  static async create(user, query) {
    // hash password
    user.password = hashSync(user.password, 10);
    const verificationCode = randomNumber();
    try {
      if (String(verificationCode).length !== 6)
        throw new Error(
          "Registration failed: server failed to generate an accurate verification code"
        );
      // create staff
      const createStaff = new Staff({
        title: user.title,
        firstName: user.adminFirstName,
        lastName: user.adminLastName,
        email: user.adminEmail,
        phone: user.adminPhone,
        password: user.password,
        verified: query.invite == true,
        specialization: user.specialization,
      });

      //create new hospital
      const createHospital = new Hospital({
        name: user.hospitalName,
        email: user.hospitalEmail,
        phone: user.hospitalPhone,
        url: user.url,
        code: user.hospitalCode,
        slug: Number(Date.now()),
      });
      // creates partial details of a hospital branch
      const createBranch = new Branch({
        branchName: "head branch",
        address: user.address,
        hospital: createHospital._id,
      });

      const newStaffWorkspace = new StaffWorkspace({
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
      await Promise.all([
        createStaff.save(),
        createHospital.save(),
        createBranch.save(),
        newStaffWorkspace.save(),
      ]);

      // send mail
      sendMail(
        "Account Verification",
        "noreply@goralsafrica.com",
        [user.adminEmail],
        {
          verificationCode,
          fullName: createStaff.firstName + " " + createStaff.lastName,
          title: createStaff.title,
        },
        "verify-signup.hbs"
      )
        .then((data) => console.log("[MESSAGE]", data))
        .catch(console.error);

      const token = deriveToken(
        createHospital._id,
        createStaff._id,
        createHospital.slug,
        true
      );

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
    for (const key in body) {
      body[key] = body[key].toLowerCase();
    }
    try {
      const data = await Hospital.findOneAndUpdate(
        { _id: credentials.hospital },
        body,
        {
          new: true,
        }
      );
      if (!data)
        throw new Error(
          "Invalid credentials: Credentials have been used already"
        );
      return successMessage(data, "workspace update success");
    } catch (err) {
      console.error(err.message);
      return serverError(
        { request: err.message },
        "failed to update hospital data"
      );
    }
  }
}

export default HospitalController;
