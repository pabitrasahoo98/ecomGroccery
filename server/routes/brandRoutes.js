const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const { createBrand, getCatagoryBrand, getAllBrand, deleteBrand} = require("../controllers/brandController");

const router =express.Router();


router
.route("/catagorybrand/:id")
.get(getCatagoryBrand)


router
  .route("/admin/brand")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllBrand);

  router
  .route("/admin/manipulatebrand")
  .post(isAuthenticateUser, authorizeRoles("admin"), createBrand);

  router
  .route("/admin/manipulatebrand/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteBrand);


  module.exports = router;