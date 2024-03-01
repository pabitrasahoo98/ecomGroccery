const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const { getAllCatagory, createCatagory, deleteCatagory } = require("../controllers/catagoryController");

const router =express.Router();


router
  .route("/catagories")
  .get( getAllCatagory);

  router
  .route("/admin/manipulatecatagory")
  .post(isAuthenticateUser, authorizeRoles("admin"), createCatagory);

  router
  .route("/admin/manipulatecatagory/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteCatagory);

  module.exports = router;