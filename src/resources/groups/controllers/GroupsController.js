import Group from "../models/Group";
import Logger from "../../auditTrail/LogsController";
import { badRequestError, successMessage } from "../../../utilities";

export default class GroupController {
  static async create(body, credentials) {
    try {
      const newGroup = new Group({
        ...body,
        hospital: credentials.hospital,
        members: [credentials.staff],
      });
      await newGroup.save();

      // log activity without blocking the cycle
      Logger.logActivity(
        credentials.hospital,
        credentials.staff,
        "created a hospital group/department",
        null,
        newGroup
      );
      return successMessage(newGroup);
    } catch (err) {
      return badRequestError({ request: err.message });
    }
  }

  static async findAll(hospital) {
    try {
      const groups = await Group.find({
        hospital,
      });
      return successMessage(groups, "group creation success");
    } catch (err) {
      return badRequestError({ request: err.message });
    }
  }

  static async findOne(_id) {
    try {
      const group = await Group.findOne({
        _id,
      }).populate("members", "firstName lastName");
      return successMessage(group, "group details retrieved");
    } catch (err) {
      return badRequestError({ request: err.message });
    }
  }

  static async updateGroup(_id, update, credentials) {
    try {
      const group = await Group.findByIdAndUpdate(_id, update, {
        new: true,
      }).populate("members", "firstName lastName");
      // log activity without blocking the cycle
      Logger.logActivity(
        credentials.hospital,
        credentials.staff,
        "updated a hospital group/department",
        null,
        group
      );
      return successMessage(group, "group details update success");
    } catch (err) {
      return badRequestError({ request: err.message });
    }
  }

  static async delete(_id, hospital, credentials) {
    try {
      const group = await Group.findOneAndDelete({ _id, hospital }).populate(
        "members",
        "firstName lastName"
      );
      Logger.logActivity(
        credentials.hospital,
        credentials.staff,
        "closed a hospital group/department",
        null,
        group
      );
      return successMessage(group, "group has been successfully closed down");
    } catch (err) {
      return badRequestError({ request: err.message });
    }
  }
}
