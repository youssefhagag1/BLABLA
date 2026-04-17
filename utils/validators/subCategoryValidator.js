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
        .withMessage("sub category required")
        .isLength({min : 2})
        .withMessage("Too short sub category name")
        .isLength({max : 32})
        .withMessage("Too Long sub category name"),
    check("category")
        .notEmpty()
        .withMessage("category required")
        .isMongoId()
        .withMessage("invalid mongo id")
        ,validatorMiddleware
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