import { body, ValidationChain } from "express-validator";

export const coursesValidation: Array<ValidationChain> = [
  body("courseCode")
    .notEmpty()
    .withMessage("Kurskoden får inte vara tom.")
    .isString()
    .withMessage("Kurskoden måste vara en sträng.")
    .isLength({ max: 6 })
    .withMessage("kurskoden får som högst vara 6 karaktärer lång."),
  body("courseName")
    .notEmpty()
    .withMessage("Kursnamnet får inte vara tomt.")
    .isString()
    .withMessage("Kursnamnet måste vara en sträng.")
    .isLength({ max: 50 })
    .withMessage("Kursnamnet får som högst vara 50 karaktärer långt."),
  body("syllabus")
    .notEmpty()
    .withMessage("Kursplanen får inte vara tom.")
    .isString()
    .withMessage("Kursplanen måste vara en sträng.")
    .isLength({ max: 2083 })
    .withMessage("Kursplanen får som högst vara 2083 karaktärer lång."),
  body("progression")
    .notEmpty()
    .withMessage("Progression måste bestå av en karaktär.")
    .isString()
    .withMessage("Progression måste vara en sträng.")
    .isLength({ max: 1 })
    .withMessage("Progression måste bestå av en karaktär.")
    .matches(/["ABC"]/)
    .withMessage("Progression måste vara en stor bokstav: A, B eller C."),
];
