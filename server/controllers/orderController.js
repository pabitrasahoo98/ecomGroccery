const Order=require("../model/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User=require("../model/userModel");
const Product=require("../model/productModel")
const sendEmail2=require("../utils/sendEmail2");


exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  // Check if orderItems exist
  if (orderItems) {
    // Array to collect mismatched items
    const mismatchedItems = [];

    // Check each item in orderItems
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      // If product price doesn't match item price, add to mismatchedItems
      if (product.price !== item.price) {
        mismatchedItems.push({
          product: item.product,
          expectedPrice: product.price,
          actualPrice: item.price
        });
      }
    }

    // If there are mismatched items, fail the order creation process
    if (mismatchedItems.length > 0) {
      return next(new ErrorHandler("Product not found or Price changed. Please reset the cart", 400));
    }
  }

  // Create order if no price mismatch
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  // Send success response
  res.status(201).json({
    success: true,
    order
  });
});



// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  
  // get logged in user  Orders
  exports.myOrders = catchAsyncError(async (req, res, next) => {

    const id=req.user._id;
    const orders = await Order.find({ user: id }).sort('-createdAt');
    res.status(200).json({
      success: true,
      orders,
    });
  });

    // delete Order 
    exports.cancelOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id);
    
      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }
    
      await order.deleteOne();
    
      res.status(200).json({
        success: true,
      });
    });
  
  // get all Orders -- Admin
  exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find().sort('-createdAt');
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });
  
  // update Order Status -- Admin
  exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    const uname=order.user.name;
    const umail=order.user.email;

    const message = `Dear ${uname},\n\n\n\n We regret to inform you that your recent order no\t${order._id} with us hasbeen cancelled.\n\nWe apologize for any
    inconvience this may cause.\nIf yo have any questions or concerns regarding this cancellation ,please feel free to contact our customer support team.\n\n\n\n\n
    We will be more than happy to assist you.Thank you for your underStanding`;
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    try {
      if(order.orderStatus !=="Delivered")
      {
      await sendEmail2({
          email:umail,
          subject:`Order Cancelled`,
          message
      });
    }

      await order.deleteOne();
  
      res.status(200).json({
        success: true,})
      
  } catch (error) {
      return next(new ErrorHandler(error.message,500));

  }
  }); 