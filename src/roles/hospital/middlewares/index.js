import {
  registerBranchValidator as branchValidator,
  registerValidator,
  updateHospitalValidator,
} from "./inputs";
import { verifyAdmin, verifyNewHospital } from "./auth";
import { generateCodes } from "./utils";
//import BranchController from "./branch.controller";

export {
  registerValidator,
  updateHospitalValidator,
  verifyAdmin,
  branchValidator,
  verifyNewHospital,
  generateCodes,
};
