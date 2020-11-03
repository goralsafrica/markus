import { io } from "../../../server";
import TemporaryData from "../../auth/models/TemporaryData";
import Staff from "../../roles/staff/models/Staff";
import { emitEvent } from "./wsHandlers";

/**
 * Notifier function for real time and push notifications
 */
export default async function (staffs, payload) {
  const onlineStaffs = await TemporaryData.find({
    $or: staffs.map((staff) => {
      return { staff };
    }),
    type: "socket_connection",
  });

  // SEND REAL TIME AND PUSH NOTIFICATIONS
  await Promise.all([
    emitEvent(
      io,
      onlineStaffs.map((s) => s.socketID),
      payload
    ),
  ]);
}
