export let cart = JSON.parse(localStorage.getItem("cart"))

if(!cart){
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2
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