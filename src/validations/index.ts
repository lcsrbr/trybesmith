import Joi from 'joi';

export const createProdSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

// export default { createProdSchema };
