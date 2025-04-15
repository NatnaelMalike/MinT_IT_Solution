import Joi from "joi";
const validate = (schema) => (req, res, next) => {

  const keys = Object.keys(schema);

  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});

  const { error } = Joi.compile(schema).validate(object);

  if (error) {
    let errorMessage = "";
    const errors = error.details.map((detail) => ({
      key: detail.context?.key,
      message: `${
        detail.type === "any.required"
          ? detail.context?.key + " is required"
          : detail.message.replace(/["']/g, "")
      }`,
    }));
    errorMessage;
    res.status(400).json({ error: true, errors });
    return;
  }

  return next();
};

export default validate;
