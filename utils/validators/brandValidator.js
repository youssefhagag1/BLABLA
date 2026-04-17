const {check} = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const slugify = require("slugify");

const getValidator = [
    check("id").isMongoId().withMessage("invalid mongo id"),
    validatorMiddleware
]

const createValidator = [
    check("name")
        .notEmpty()
        .withMessage("category required")
        .isLength({min : 3})
        .withMessage("Too short category name")
        .isLength({max : 32})
        .withMessage("Too Long category name"),
        validatorMiddleware
]

const updateValidator = [
    check("id").isMongoId().withMessage("invalid mongo id"),
    validatorMiddleware
]
const deleteValidator = [
    check("id").isMongoId().withMessage("invalid mongo id"),
    validatorMiddleware
]

module.exports = {getValidator , createValidator , updateValidator , deleteValidator}