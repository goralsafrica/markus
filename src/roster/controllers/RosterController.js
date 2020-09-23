import { HospitalRoster, HospitalStaffRoster } from "../model";
import {
  serverError,
  badRequestError,
  successMessage,
  getDays,
} from "../../utilities";

class RosterController {
  static async create({ credentials, body }) {
    const newPeriod = {};
    for (let i = 0; i < body.shifts.length; i++) {
      newPeriod[String(i + 1)] = [];
    }
    const days = getDays();
    const newStaffRoster = new HospitalStaffRoster();
    const len = body.openingDays ? body.openingDays.length : 7;
    for (let i = 0; i < len; i++) {
      newStaffRoster.set(days[i], newPeriod);
    }
    const newHospitalRoster = new HospitalRoster();
    newHospitalRoster.hospital = credentials.hospital;
    newHospitalRoster.staffRoster = newStaffRoster._id;
    newHospitalRoster.shifts = body.shifts;
    try {
      const [h, s] = await Promise.resolve([
        newHospitalRoster.save(),
        newStaffRoster.save(),
      ]);
      if (!h || !s) throw new Error("failed");
      return successMessage(
        {
          roster: newHospitalRoster._id,
        },
        "hospital roster initiated"
      );
    } catch (err) {
      console.log(err);
      return serverError(
        {
          request: "request failure",
        },
        "failed to create hospital roster"
      );
    }
  }

  static async findOne({ hospital }) {
    try {
      const roster = await HospitalRoster.find({ hospital }).populate({
        path: "staffRoster",
        model: "HospitalStaffRoster",
      });
      return {
        status: 200,
        result: {
          data: roster,
          errors: null,
          message: "hospital roster retrieved",
        },
      };
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "invalid hospital id",
        },
        "failed to fetch hospital roster"
      );
    }
  }

  static async update({ body, params }) {
    try {
      const staffRosterId = body.staffRoster._id;
      delete body.staffRoster._id;
      const tableUpdate = await HospitalStaffRoster.findByIdAndUpdate(
        id,
        body.staffRoster
      );
      const rosterUpdate = await HospitalRoster.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );
      return {
        status: 200,
        result: {
          data: rosterUpdate,
          errors: null,
          message: "hospital roster updated",
        },
      };
    } catch (err) {
      console.error(err);
      return serverError(
        {
          request: "invalid roster id",
        },
        "failed to update hospital roster"
      );
    }
  }
}

export default RosterController;
