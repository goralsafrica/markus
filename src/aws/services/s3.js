import AWS from "../";
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

class Storage {
  static async deleteRecording(Key) {
    const params = { Bucket: BUCKET_NAME, Key };
    try {
      console.log(params);
      const response = await s3.deleteObject(params);
      console.log("RESPONSE", response);
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getRecordings() {}
}

export default Storage;
