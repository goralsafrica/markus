import AWS from "../index";

const storage = new AWS.S3();

const params = { Bucket: "goralstranscribebucket" };

export const deleteObject = (path) => {
  return async function () {
    const data = { ...params, Key: path };
    try {
      await storage.headObject(data).promise();
      console.log("file found");
      return storage.deleteObject(data).promise();
    } catch (err) {
      console.log("AWS DELETE ERROR: ", err.code, err.message);
    }
  };
};
