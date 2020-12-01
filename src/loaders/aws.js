import AWS from "../aws";

export default function () {
  return new Promise((resolve) => {
    AWS.config.getCredentials((err) => {
      if (err) throw err;
      //console.log("AWS LOADED SUCCESSFULLY");
      resolve();
    });
  });
}
