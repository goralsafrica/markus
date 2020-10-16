import Affiliate from "../models/Affiliate";

class HospitalHealthInsuranceController {
  static async create(req, res, next) {
    const { hospital } = req.credentials;
    const affiliate = { ...req.body, hospital };
    try {
      const newAffiliate = await Affiliate.create(affiliate);
      res.send({
        data: newAffiliate,
        errors: null,
        message: "hospital hmo list updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to add price category",
      ]);
    }
  }

  static async findAll(req, res, next) {
    const { hospital } = req.credentials;
    try {
      const affiliateList = await Affiliate.find({ hospital });
      res.send({
        data: affiliateList,
        errors: null,
        message: "hospital hmo list retrieved",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to retirev hmo list",
      ]);
    }
  }

  static async update(req, res, next) {
    try {
      const affiliate = await Affiliate.findByIdAndUpdate(
        req.params.affiliateid,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );
      res.send({
        data: affiliate,
        errs: null,
        message: "hospital hmo list has been updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital price list",
      ]);
    }
  }

  static async delete(req, res, next) {
    try {
      const affiliate = await Affiliate.findByIdAndDelete(
        req.params.affiliateid
      );
      res.send({
        data: affiliate,
        errors: null,
        message: "hospital hme list has been updated",
      });
    } catch (err) {
      console.log(err);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital hmo list",
      ]);
    }
  }
}

export default HospitalHealthInsuranceController;
