const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const { getAllPincode, createPincode, deletePincode } = require("../controllers/pinCodeController");
const router =express.Router();


router
  .route("/pincodes")
  .get( getAllPincode);

  router
  .route("/admin/manipulatepincodes")
  .post(isAuthenticateUser, authorizeRoles("admin"), createPincode);

  router
  .route("/admin/manipulatepincodes/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deletePincode);

  module.exports = router;