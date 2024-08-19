import { renderOrderSummary } from "../../script/checkout/orderSummary.js"
import {  loadFromStorage , cart } from "../../data/cart.js";
import { LoadProducts } from "../../data/products.js";

describe("-Test Suite: renderOrderSummary Function", ()=>{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    beforeAll((done)=>{
        LoadProducts(()=>{
            done()
        });
    })
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

        document.querySelector(".js-test-container").innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
            <div class="checkout-header-js"></div>
        `;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '1'
                }
            ]);
        }); 
        loadFromStorage();
        renderOrderSummary();
    })

    afterEach(()=>{
        document.querySelector(".js-test-container").innerHTML = `

        `;
    })
    it("-Display the cart-", ()=>{

        expect(
            document.querySelectorAll(".js-cart-item-test").length
        ).toEqual(2)

        expect(
            document.querySelector(`.js-product-quantity-test-${productId1}`).innerText
        ).toContain("Quantity: 2")
        expect(
            document.querySelector(`.js-product-quantity-test-${productId2}`).innerText
        ).toContain("Quantity: 2")
    });

    it('-Remove a product- ', ()=>{

        document.querySelector(`.js-delete-quantity-${productId1}`).click()
        expect(
            document.querySelectorAll(".js-cart-item-test").length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null)

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);



    })

})