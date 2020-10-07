export default function (app, config) {
  process.on("newNotification", function (data) {
    console.log(data);
  });
  return;
}
