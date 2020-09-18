import Hospital from "../hospital/models/Hospital";
class moderatorController {
  static async index(req, res, next) {
    try {
      const data = await Hospital.find();
      res.json({
        data,
        errors: null,
        message: "list of hospitals retrieved",
      });
    } catch (err) {
      next([
        500,
        ["Internal Server error... please try again later"],
        "server  failed to respond :(",
      ]);
    }
  }

  static async show(req, res, next) {
    if (!req.params.id)
      return next(400, ["hospital id required"], "invalid request");
    try {
      const data = await Hospital.findById(req.params.id);
      res.json({
        data,
        errors: null,
        message: "Hospital found",
      });
    } catch (err) {
      next([
        500,
        ["Internal Server error... please try again later"],
        "server  failed to respond :(",
      ]);
    }
  }
}

export default moderatorController;
