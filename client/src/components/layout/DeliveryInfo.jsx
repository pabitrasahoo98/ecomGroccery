import React from 'react';
import './DeliveryInfo.css'; // Import CSS file for styling

const DeliveryInfo = () => {
  return (
    <section className="delivery-info">
      <div className="container">
        <h2>Fast & Free Delivery</h2>
        <p>Get your orders delivered to your doorstep quickly and reliably.</p>
        <ul>
          <li><strong>Estimate Delivery Time:</strong>On next Day</li>
          <li><strong>Free Shipping:</strong> On all orders</li>
          <li><strong>No Minimum Order</strong></li>
        </ul>
      </div>
    </section>
  );
};

export default DeliveryInfo;