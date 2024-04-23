import Joi from 'joi';
import { validateReq } from '../helpers/validation.helper';
import { CommonValidationFilter } from '../helpers/validation.helper';

export const loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Phone cannot be an empty string.',
            'string.required': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
        }),
        password: new CommonValidationFilter().password(),
    });
    validateReq(req, next, loginSchema);
};
export const SignupValidqtion = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Phone cannot be an empty string.',
            'string.required': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
        }),
        name: Joi.string().required(),
        phone: Joi.string().required().messages({
            'string.empty': 'Phone cannot be an empty string.',
            'string.required': 'Phone is required.',
        }),
        password: new CommonValidationFilter().password(),
    });
    validateReq(req, next, loginSchema);
};
