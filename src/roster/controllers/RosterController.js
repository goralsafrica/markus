import Roster from "../model/Roster";
import { serverError, badRequestError, successMessage } from "../../utilities";

class RosterController {
  static async create({ credentials, body }) {
    body.hospital = credentials.hospital;
    const structure = Array(7).fill(Array(body.periods.length).fill([]));
    body.roster = structure;
    // return body;
    try {
      const roster = await Roster.create(body);
      return successMessage(roster, "hospital roster has been created");
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
