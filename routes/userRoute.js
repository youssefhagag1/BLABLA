const express = require("express");
const {editId,updateLoggedUserPassword , uploadUserImage , processImage , getUsers , getUser , createUser , updateUser , updateUserPassword, deleteUser} = require("../services/userService");
const { getValidator, createValidator, updateValidator, deleteValidator, updatePasswordValidator } = require("../utils/validators/userValidator");
const {protect , allowTo} = require("../services/authService")
const router = express.Router();

router.use(protect)

router.patch("/me/password" , editId , updatePasswordValidator , updateLoggedUserPassword )

router.route("/me")
        .get(editId , getUser )
        .patch(editId , uploadUserImage , processImage , updateValidator , updateUser)
        
router.patch("/changePassword/:id" , allowTo("admin") , updatePasswordValidator , updateUserPassword)
router.route("/")
        .get(allowTo("admin" , "manger") ,getUsers)
        .post(allowTo("admin") ,uploadUserImage , processImage , createValidator , createUser)
router.route("/:id")
        .get(allowTo("admin") ,getValidator,getUser)
        .patch(allowTo("admin") ,uploadUserImage , processImage , updateValidator , updateUser)
        .delete(allowTo("admin") ,deleteValidator , deleteUser)

module.exports = router;