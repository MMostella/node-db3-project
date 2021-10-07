const db = require("../../data/db-config");

function find() {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.scheme_id", "sc.scheme_name")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id", "asc");
}

async function findById(scheme_id) {
  const data = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select(
      "sc.scheme_name",
      "st.step_id",
      "st.step_number",
      "st.instructions",
      "sc.scheme_id"
    )
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number", "asc");

  return data.reduce((acc, step) => {
    const { step_id, step_number, instructions } = step;
    if (acc.scheme_id) {
      acc.steps.push({ step_id, step_number, instructions });
    } else {
      acc = {
        scheme_id: step.scheme_id,
        scheme_name: step.scheme_name,
        steps: step_id ? [{ step_id, step_number, instructions }] : [],
      };
    }
    return acc;
  }, {});
}

async function findSteps(scheme_id) {
  const results = await db
    .where("sc.scheme_id", parseInt(scheme_id))
    .select("sc.scheme_name", "st.step_id", "st.step_number", "st.instructions")
    .from("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .orderBy("st.step_number");

  return results.filter((step) => step.step_number);
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

async function addStep(scheme_id, step) {
  const { step_number, instructions } = step;
  await db("steps").insert({ step_number, instructions, scheme_id });
  return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
