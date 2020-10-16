import Role from "../src/staff/models/Role";
const roles = ["head of branch", "head of department"];

export default function createMultiple(req, res) {
  const body = [];
  roles.forEach((role) => {
    body.push({
      name: role,
      category: "5f5b6c3ebecfefabaefe913e",
    });
  });
  Role.create(body)
    .then((res) => console.log(res))
    .catch((er) => console.error(er));
}
