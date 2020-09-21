import {
  registerBranchValidator as branchValidator,
  hospitalChecker,
  registerValidator,
} from "./register";
import { verifyNewHospital } from "./auth";
import { generateCodes } from "./utils";
//import BranchController from "./branch.controller";

export {
  registerValidator,
  hospitalChecker,
  branchValidator,
  verifyNewHospital,
  generateCodes,
};
