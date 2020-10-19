import {
  registerBranchValidator as branchValidator,
  registerValidator,
  updateHospitalValidator,
  registerHospitalValidator,
} from "./inputs";
import { verifyAdmin, verifyNewHospital } from "./auth";
import { generateCodes } from "./utils";
//import BranchController from "./branch.controller";

export {
  registerValidator,
  updateHospitalValidator,
  verifyAdmin,
  registerHospitalValidator,
  branchValidator,
  verifyNewHospital,
  generateCodes,
};
