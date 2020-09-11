import Branch from "../../branch/branch.model";
import Hospital from "../models/Hospital";
//import { hashSync } from "bcryptjs";
class HospitalBranchController {
  static async create(req, res, next) {
    const { address, city, state, country, credentials } = req.body;
    try {
      const data = Branch.create({
        address,
        city,
        state,
        country,
        hospital: credentials.hospital,
      });
      if (!data)
        next([400, ["invalid input data"], "failed to create hospital"]);
      res.send({
        data,
        errors: null,
        mesaage: "new branch created",
      });
    } catch (err) {
      console.log(err);
      next([500, ["server  failed to respond :("], "failed to create branch"]);
    }
  }
  static async findAll(req, res, next) {
    try {
      const data = await Branch.find({
        hospital: req.body.credentials.hospital,
      })
        .select("-hospital")
        .populate("departments");

      if (!data) next([400, ["invalid hospital id"], "branch(es) not found"]);
      res.send({
        data,
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }

  static async findOne(req, res, next) {
    try {
      const data = await Branch.findById(req.params.id);

      if (!data) next([400, ["invalid branch id"], "branch not found"]);
      res.send({
        data,
        errors: null,
        message: "branch found",
      });
    } catch (err) {
      next([500, "server  failed to respond :("]);
    }
  }

  static async update(req, res, next) {
    console.log("hit");
    try {
      const data = await Branch.findByIdAndUpdate(
        req.params.id,
        {
          address: req.body.address,
          landmark: req.body.landmark,
        },
        { new: true, useFindAndModify: false }
      );
      if (!data) next([400, ["invalid branch id"], "update failed"]);
      res.send({
        data,
        errors: null,
        message: "branch has been successfully updates",
      });
    } catch (err) {
      console.error(err);
      next([500, ["server failed to respond"], "server  failed to respond :("]);
    }
  }
}

export default HospitalBranchController;
