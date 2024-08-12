import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../util/money.js";

export function renderPayment(){
    let productPriceCents  = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem)=>{
        const matchingItem = getProduct(cartItem.productId);
        productPriceCents += matchingItem.priceCents * cartItem.quantity
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.priceCents
    })

    const totalBeforeTax = productPriceCents + shippingPrice;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;


    const paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `

    document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml
}