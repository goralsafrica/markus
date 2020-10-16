import StaffCategory from "../src/staff/models/StaffCategory";
const departments = [
  "Doctors",
  "Nurses",
  "Allied Health Professionals",
  "Others",
];

export default function createMultiple(req, res) {
  const body = [];
  departments.forEach((role) => {
    body.push({
      name: role,
    });
  });

  StaffCategory.create(body)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
