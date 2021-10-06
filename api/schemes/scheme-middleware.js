const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.scheme_id);
    const schemeSteps = await Scheme.findSteps(req.params.scheme_id);
    if (scheme) {
      if (schemeSteps) {
        next();
      } else {
        res.status(201).json([]);
      }
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
  // next();
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  // const { scheme_name } = req.body;
  // if (
  //   scheme_name === undefined ||
  //   scheme_name === " " ||
  //   typeof scheme_name != "string"
  // ) {
  //   next({ status: 400, message: "invalid scheme_name" });
  // } else {
  //   next();
  // }
  next();
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  // const { step_number, instructions } = req.body;
  // if (
  //   instructions === undefined ||
  //   instructions === " " ||
  //   typeof instructions != "string"
  // ) {
  //   next({ status: 400, message: "invalid step" });
  // } else if (step_number < 1 || typeof step_number != "number") {
  //   next({ status: 400, message: "invalid step" });
  // } else {
  //   next();
  // }
  next();
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
