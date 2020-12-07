import AWS from "aws-sdk";
import { awsCredentials } from "../../config";

// configure aws
AWS.config.update(awsCredentials);

export function loadAWS() {
  return new Promise((resolve) => {
    AWS.config.getCredentials((err) => {
      if (err) throw err;
      //console.log("AWS LOADED SUCCESSFULLY");
      resolve();
    });
  });
}

//Storage.deleteRecording()
export default AWS;
// export * from "./helpers/storage";
