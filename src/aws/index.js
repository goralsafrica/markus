import AWS from "aws-sdk";
import { awsCredentials } from "../config";
import path from "path";
//import Storage from "./services/s3";

// configure aws
AWS.config.update(awsCredentials);

//Storage.deleteRecording()
export default AWS;
