const express=require("express");
const{isAuthenticateUser,authorizeRoles}=require("../middleware/auth");
const { createOrder,
     getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
    cancelOrder,} = require("../controllers/orderController");
const router =express.Router();


router.route("/order/new").post(isAuthenticateUser,createOrder);

router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticateUser, myOrders);


router
  .route("/cancelorder/:id")
  .delete(isAuthenticateUser, cancelOrder);

router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
