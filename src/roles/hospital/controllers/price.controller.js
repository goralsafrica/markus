import { Price } from "../models/Price";

class HospitalPriceController {
  static async create(req, res, next) {
    const { hospital } = req.credentials;
    const pricing = { ...req.body, hospital };
    try {
      const newPrice = await Price.create(pricing);
      res.send({
        data: newPrice,
        errors: null,
        message: "hospital price list updated",
      });
    } catch (err) {
      console.log(error);
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
      const priceList = await Price.find({ hospital });
      res.send({
        data: priceList,
        errors: null,
        message: "hospital price list retrieved",
      });
    } catch (err) {
      console.log(error);
      return next([
        500,
        ["server failed to respond"],
        "failed to retrieve hospital price list",
      ]);
    }
  }

  static async update(req, res, next) {
    try {
      const priceList = await Price.findByIdAndUpdate(
        req.params.priceid,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );
      res.send({
        data: priceList,
        errors: null,
        message: "hospital price list has been updated",
      });
    } catch (err) {
      console.log(error);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital price list",
      ]);
    }
  }

  static async delete(req, res, next) {
    try {
      const priceList = await Price.findByIdAndDelete(req.params.priceid);
      res.send({
        data: priceList,
        errors: null,
        message: "hospital price list has been updated",
      });
    } catch (err) {
      console.log(error);
      return next([
        500,
        ["server failed to respond"],
        "failed to update hospital price list",
      ]);
    }
  }
}

export default HospitalPriceController;
