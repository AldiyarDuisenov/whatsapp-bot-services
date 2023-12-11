import { body } from "express-validator";

export const botValidation = [
  body("botNumber").isLength({ min: 11, max: 11 }),
  body("managers").isLength({ min: 1 }),
];
