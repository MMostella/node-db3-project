const db = require("../../data/db-config");

function find() {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.scheme_id", "sc.scheme_name")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id");
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
    .where("sc.scheme_id", scheme_id);

  const result = {
    scheme_id: data[0].scheme_id,
    scheme_name: data[0].scheme_name,
    steps: data.map((scheme) => {
      return {
        step_id: scheme.step_id,
        step_number: scheme.step_number,
        instructions: scheme.instructions,
      };
    }),
  };
  return result;
}

function findSteps(scheme_id) {
  return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.scheme_id")
    .select("st.step_id", "st.step_number", "st.instructions", "sc.scheme_name")
    .where("sc.scheme_id", scheme_id);
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

function addStep(scheme_id, step) {
  // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
  return db("steps").insert(step).where("scheme_id", scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
