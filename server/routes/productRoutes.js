const express=require("express");
const {getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, getAdminProducts, getDODProducts, getDEProducts, getTDProducts}=require("../controllers/productController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router =express.Router();
router.route("/products").get(getAllProducts);
router.route("/dodproducts").get(getDODProducts);
router.route("/deproducts").get(getDEProducts);
router.route("/tdproducts").get(getTDProducts);
router.route("/admin/products").get(isAuthenticateUser,authorizeRoles("admin"),getAdminProducts);
router.route("/admin/product/new").post(isAuthenticateUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);
module.exports=router