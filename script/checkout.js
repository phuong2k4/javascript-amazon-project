import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { LoadProducts } from "../data/products.js";
import { LoadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/car.js'
// import '../data/backend-practice.js'

Promise.all([
    new Promise ((resolve,reject)=>{
        LoadProducts(()=>{
            resolve()
        });
    }),
    new Promise((resolve)=>{
        LoadCart(()=>{
            resolve()
        })
    })
]).then(() => {
    renderCheckoutHeader()
    renderOrderSummary()
    renderPayment()
})

// new Promise ((resolve)=>{
//     LoadProducts(()=>{
//         resolve();
//     });
    
// }).then(()=>{
//     return new Promise((resolve)=>{
//         LoadCart(()=>{
//             resolve()
//         })
//     })

// }).then(()=>{
//     renderCheckoutHeader()
//     renderOrderSummary()
//     renderPayment()
// })


// LoadProducts(()=>{
//     LoadCart(()=>{
//         renderCheckoutHeader()
//         renderOrderSummary()
//         renderPayment()
//     })
// })