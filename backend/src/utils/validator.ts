import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        };
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
}

export const signupValidator = [
    body("name").notEmpty().withMessage("Name must not be empty."),
    body("email").trim().notEmpty().withMessage("Email must not be empty").isEmail().withMessage("Email must be a valid email address."),
    body("password").notEmpty().withMessage("Password must not be empty").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
]