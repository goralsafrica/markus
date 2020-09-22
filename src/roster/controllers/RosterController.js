import Roster from "../model/Roster";
import { serverError, badRequestError } from "../../utilities";

class RosterController {
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
