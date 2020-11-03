import TemporaryData from "../../auth/models/TemporaryData";
import Staff from "../../roles/staff/models/Staff";

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

  console.log(onlineStaffs);
}
