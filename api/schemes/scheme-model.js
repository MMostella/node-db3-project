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
  // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) {
  // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) {
  // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
