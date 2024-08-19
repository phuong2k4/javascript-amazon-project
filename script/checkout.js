import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { LoadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/car.js'
// import '../data/backend-practice.js'


LoadProducts(()=>{
    renderCheckoutHeader()
    renderOrderSummary()
    renderPayment()
})