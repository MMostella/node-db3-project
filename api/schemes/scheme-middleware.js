const Scheme = require("./scheme-model");

const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.scheme_id);
    if (Object.keys(scheme).length) {
      next();
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

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined ||
    scheme_name === " " ||
    typeof scheme_name != "string"
  ) {
    next({ status: 400, message: "invalid scheme_name" });
  } else {
    next();
  }
  // next();
};

const validateStep = (req, res, next) => {
  const { step_number, instructions } = req.body;
  if (
    instructions === undefined ||
    instructions === "" ||
    typeof instructions != "string"
  ) {
    next({ status: 400, message: "invalid step" });
  } else if (step_number < 1 || typeof step_number != "number") {
    next({ status: 400, message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
