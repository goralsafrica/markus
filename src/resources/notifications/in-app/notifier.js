import { io } from "../../../server";
import TemporaryData from "../../auth/models/TemporaryData";
import Staff from "../../roles/staff/models/Staff";
import { emitEvent } from "./wsHandlers";

/**
 * Notifier function for real time and push notifications
 */
export default async function (staffs) {
  const onlineStaffs = await TemporaryData.find({
    $or: staffs.map((staff) => {
      return { staff };
    }),
    type: "socket_connection",
  });

  // send to only specific users
  emitEvent(
    io,
    onlineStaffs.map((s) => s.socketID)
  );
}
