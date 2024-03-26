const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const {  createSubCatagory, deleteSubCatagory, getAllSubCatagory, getCatagorySubcatagory} = require("../controllers/subCatagoryController");

const router =express.Router();




router
.route("/catagorysubcatagory/:id")
.get(getCatagorySubcatagory)


router
  .route("/admin/subcatagories")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllSubCatagory);

  router
  .route("/admin/manipulatesubcatagory")
  .post(isAuthenticateUser, authorizeRoles("admin"), createSubCatagory);

  router
  .route("/admin/manipulatesubcatagory/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteSubCatagory);


  module.exports = router;