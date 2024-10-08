import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { LoadProducts } from "../data/products.js";
import { LoadCart } from "../data/cart.js";
import { LoadProductFetch } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/car.js'
// import '../data/backend-practice.js'

async function LoadPage(){
    try{
        // throw new Error ("Duuuuuuuuuuu")
        await LoadProductFetch();
        const value = await new Promise((resolve)=>{
            LoadCart(()=>{
                resolve()
            })
        })
    }catch(error){
        console.log("Error: Promise status can't return 'Fulfilled' /", error.message)
    }finally{
        renderCheckoutHeader();
        renderOrderSummary();
        renderPayment();
    }
}
LoadPage();

/*
Promise.all([
    LoadProductFetch(),
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
*/
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