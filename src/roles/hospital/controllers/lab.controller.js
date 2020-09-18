import Lab from "../models/Lab";

class HospitalLabController {
  static async create(req, res, next) {
    const { hospital } = req.credentials;
    let lab = { ...req.body, hospital };
    try {
      lab = await Lab.create(lab);
      res.send({
        data: lab,
        errors: null,
        message: "hospital external labs list updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital labs",
      ]);
    }
  }

  static async findAll(req, res, next) {
    const { hospital } = req.credentials;
    try {
      const labs = await Lab.find({ hospital });
      res.send({
        data: labs,
        errors: null,
        message: "hospital labs list retrieved",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to retrieve lab list",
      ]);
    }
  }

  static async update(req, res, next) {
    try {
      const lab = await Lab.findByIdAndUpdate(
        req.params.labid,
        {
          ...req.body,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.send({
        data: lab,
        errs: null,
        message: "hospital lab has been updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital lab",
      ]);
    }
  }

  static async delete(req, res, next) {
    try {
      const lab = await Lab.findByIdAndDelete(req.params.labid, {
        useFindAndModify: false,
      });
      res.send({
        data: lab,
        errors: null,
        message: "hospital lab list has been updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital lab list",
      ]);
    }
  }
}

export default HospitalLabController;
