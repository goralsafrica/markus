import Roster from "../model/HospitalRoster";
import { serverError, badRequestError, successMessage } from "../../utilities";

class RosterController {
  static async create({ credentials, body }) {
    body.hospital = credentials.hospital;
    const roster = {};
    roster.monday = {};
    // roster.monday[body.hospital] = [body.hospital, body.hospital];
    body.roster = roster;
    try {
      const newRoster = new Roster(body);
      newRoster.roster.monday.set(body.hospital, "emeka");
      if (await newRoster.save())
        return successMessage(newRoster, "hospital roster has been created");
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
      const roster = await Roster.find({ hospital });
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
}

export default RosterController;
