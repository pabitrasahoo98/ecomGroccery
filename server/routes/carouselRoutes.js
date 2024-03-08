const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const { addCarousel, getAllCarousels, deleteCarousel, getCarousel, updateCarousel } = require("../controllers/carouselController");

const router =express.Router();


router
  .route("/carousel")
  .get( getAllCarousels);

  router
  .route("/admin/manipulatecarousel")
  .post(isAuthenticateUser, authorizeRoles("admin"), addCarousel);

  router
  .route("/admin/manipulatecarousel/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteCarousel);
  
  router
  .route("/admin/manipulatecarousel/:id")
  .get(isAuthenticateUser, authorizeRoles("admin"), getCarousel);

  router
  .route("/admin/manipulatecarousel/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateCarousel);

  module.exports = router;