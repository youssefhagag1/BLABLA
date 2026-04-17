const express = require("express");
const { signup , login ,  forgetPassword , verifyResetCode , resetPassword} = require("../services/authService");
const { signupValidator , loginValidator} = require("../utils/validators/authValidator");
const router = express.Router();

router.post("/signup" , signupValidator , signup)
router.post("/login" , loginValidator , login)
router.post("/forget" , forgetPassword)
router.post("/verify" , verifyResetCode)
router.post("/reset" , resetPassword)

// router.patch("/changePassword/:id" , updatePasswordValidator , updateUserPassword)
// router.route("/")
//         .get(getUsers)
//         .post(uploadCategoryImage , processImage , createValidator , createUser)
// router.route("/:id")
//         .get(getValidator,getUser)
//         .patch(uploadCategoryImage , processImage , updateValidator , updateUser)
//         .delete(deleteValidator , deleteUser)

module.exports = router;