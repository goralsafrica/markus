import Deparment from "./department.model";
const roles = [
  "Accident and emergency",
  "Anesthetics",
  "Breast screening",
  "Cardiology",
  "Chaplaincy",
  "Critical care",
  "Diagnostic imaging",
  "Discharge lounge",
  "Ear nose and throat (ENT)",
  "Elderly services",
  "Gastroenterology",
  "General surgery",
  "Gynaecology",
  "Haematology",
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
export default function createMultiple(req, res) {
  const body = [];
  roles.forEach((role) => {
    body.push({
      name: role,
    });
  });

  console.log(body);
  Deparment.create(body)
    .then((res) => console.log(res))
    .catch((er) => console.error(er));
}
