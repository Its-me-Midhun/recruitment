const Joi = require('joi');

const jobsValidation = async (req, res, next) => {
  //   const dateFormat = 'YYYY-MM-DD';
  const schema = Joi.object({
    Title: Joi.string().required(),
    Company_Name: Joi.string().required(),
    Technologies: Joi.array().items(Joi.string()).required(),
    Skills: Joi.array().items(Joi.string()).required(),
    Benefits: Joi.array().items(Joi.string()).required(),
    Experience: Joi.string().required(),
    Salary: Joi.number().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({
      success: false,
      msg: 'validation error',
      err: err.message,
    });
  }
};

module.exports = jobsValidation;
