import Role from "../src/staff/models/Role";
const roles = [
  "clinical assistant",
  "patient services assistant",
  "porter",
  "volunteer",
  "ward clerk",
];

export default function createMultiple(req, res) {
  const body = [];
  roles.forEach((role) => {
    body.push({
      name: role,
      category: "5f5a3395d66cc038ce1f5b31",
    });
  });
  Role.create(body)
    .then((res) => console.log(res))
    .catch((er) => console.error(er));
}
