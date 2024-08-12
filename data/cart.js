export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            deliveryOptionId: '1'
        }
    ];
}


function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}


export function addCart(productId){
    var matchingItem;
    cart.forEach((product)=>{
        if(productId===product.productId){
            matchingItem = product;
        }
    })
  
    if(matchingItem){
        matchingItem.quantity++;
    } else{
        cart.push({
            productId: productId,
            quantity:1
        })
    }
    saveCart();
  }

export function removeCart(productId) {
    const newCart = []
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart
    saveCart()
}

export function updateCartQuantity(){
    let quantity = 0;
    cart.forEach((item)=>{
        quantity +=item.quantity
    })
    document.querySelector(".cart-quantity").innerHTML = `${quantity}`
}

export function updateQuantity(productId,newQuantity){
    cart.forEach((item)=>{
        if(item.productId===productId){
            item.quantity = newQuantity;
        }
    })
    saveCart()
}

export function updateDeliveryOptions(productId, deliveryOptionId){
    var matchingItem;
    cart.forEach((product)=>{
        if(productId===product.productId){
            matchingItem = product;
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveCart()
}