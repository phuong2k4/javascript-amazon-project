export const cart = [];

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
  }