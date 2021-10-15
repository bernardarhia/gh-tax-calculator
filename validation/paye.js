const Joi = require("joi");

// registration validation
function payeValidation(data){
const schema = Joi.object({
  income: Joi.number().min(0).required(),
  allowance: Joi.number(),
  taxRelief: Joi.number(),
  isAnnual : Joi.boolean()
});
 return schema.validate(data)

}

module.exports = {payeValidation}