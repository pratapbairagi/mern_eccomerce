
const express = require("express")
const { regitesrNewUser, loginUser, logout, userLogged, getAllUsersAdmin, editProfileByUser, getSingleUserByAdmin, updateUserRole, userDeleteByAdmin, passwordRecoveryMail, setNewPassword } = require("../controller/userController")
const { userAuthenticate } = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")

const userRoute = express.Router()

userRoute.route("/v1/register").post(regitesrNewUser)
userRoute.route("/v1/login").post(loginUser)
userRoute.route("/v1/userLogged").get(userAuthenticate,userLogged) 
userRoute.route("/v1/logout").get(logout)
userRoute.route("/v1/profile/edit").put(userAuthenticate, editProfileByUser)
userRoute.route("/v1/user/details/:id").get(userAuthenticate, userRole("admin"), getSingleUserByAdmin)
userRoute.route("/v1/user/role/update/:id").put(userAuthenticate, userRole("admin"), updateUserRole)
userRoute.route("/v1/user/delete/:id").delete(userAuthenticate, userRole("admin"), userDeleteByAdmin)

userRoute.route("/v1/password/forgot").post(passwordRecoveryMail)
userRoute.route("/v1/password/recover/:token" ).put(setNewPassword)

// admin
userRoute.route("/v1/users").get(userAuthenticate, userRole("admin")  ,getAllUsersAdmin)


module.exports = userRoute