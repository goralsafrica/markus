//const Department = require("../src/roles/department/models/Department");
const departments = [
  "Accident and emergency",
  "Anesthetics",
  "Breast screening",
  "Cardiology",
  "Chaplaincy",
  "Critical care",
  "Diagnostic imaging",
  "Discharge lounge",
  "Front desk",
  "Ear nose and throat (ENT)",
  "Elderly services",
  "Gastroenterology",
  "General surgery",
  "Gynaecology",
  "Haematology",
  "Management",
  "Maternity departments",
  "Microbiology",
  "Neonatal unit",
  "Nephrology",
  "Neurology",
  "Nutrition and dietetics",
  "Obstetrics and gynaecology units",
  "Occupational therapy",
  "Oncology",
  "Ophthalmology",
  "Orthopaedics",
  "Pain management clinics",
  "Pharmacy",
  "Physiotherapy",
  "Radiotherapy",
  "Renal unit",
  "Rheumatology",
  "sexual health (genitourinary medicine)",
  "Urology",
  "Finance",
  "Procurement",
  "Repair & Maintenance",
  "Information Technology",
];

module.exports = function createMultiple(Department, req, res) {
  Department.create(departments)
    .then((d) => console.log(d))
    .catch((err) => console.log(err));
};
