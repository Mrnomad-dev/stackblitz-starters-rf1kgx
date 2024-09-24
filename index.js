const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

let taxRate = 0.05; //5%
let discountPercentage = 0.9; //10%
let loyaltyRate = 2; //2 points per 1$

//EndPoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartValue = cartTotal + newItemPrice;

  // Send the result back as a string
  res.send(totalCartValue.toString());
});
//cart-total?newItemPrice=1200&cartTotal=0

//EndPoint 2:Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice = cartTotal * 0.9;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});
//membership-discount?cartTotal=3600&isMember=true

//EndPoint 3:Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let taxAmount = cartTotal * taxRate;

  // Return the tax amount as a string
  res.send(taxAmount.toString());
});
//calculate-tax?cartTotal=3600

//EndPoint 4:Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);

  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send('invalid shipping method');
  }
  res.send(deliveryDays.toString());
});
//estimate-delivery?shippingMethod=express&distance=600

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});
//shipping-cost?weight=2&distance=600

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});
//loyalty-points?purchaseAmount=3600

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
