import GroupMessage from "../models/GroupMessage";
import TemporaryData from "../../auth/models/TemporaryData";
import emitEventsToSocket from "../../notifications/in-app/notifier";
import Staff from "../../roles/staff/models/Staff";

export default class GroupMessagesController {
  static async createMessage(payload, credentials) {
    // add message to database
    return GroupMessage.create({
      group: payload.group,
      message: payload.message,
      attachment: payload.attachment || "",
      sender: credentials.staff,
    });
  }

  static async getMessages() {}

  static async sendMessage(message, io) {
    const {
      group: { members },
    } = await GroupMessage.findById(message._id).populate({
      path: "group",
      model: "Group",
      populate: {
        path: "members",
        model: "Staff",
      },
    });

    const sender = Staff.findById(sender);

    const tokens = members
      .map((member) => member.deviceToken)
      .filter((token) => Boolean(token) == true);
    const queryOnlineUsers = members.map((member) => {
      return { staff: member._id };
    });
    let onlineUsers = await TemporaryData.find({
      $or: queryOnlineUsers,
      type: "socket_connection",
    });
    onlineUsers = onlineUsers.map((user) => user.socketID);

    const payload = {
      message: message.message,
      attachment: message.attachments,
      sender,
    };
    //emit to all online users and also send push notifications
    return Promise.all([
      emitEventsToSocket(io, "message", payload, onlineUsers),
      //sendPushNotifications,
    ]).catch(console.log);
  }
}
