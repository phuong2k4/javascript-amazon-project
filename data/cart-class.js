
class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
        if(!this.cartItems){
            this.cartItems = [
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
    };

    saveCart(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addCart(productId){
        var matchingItem;
        this.cartItems.forEach((product)=>{
            if(productId===product.productId){
                matchingItem = product;
            }
        })
    
        if(matchingItem){
            matchingItem.quantity++;
        } else{
            this.cartItems.push({
                productId: productId,
                quantity:1
            })
        }
        this.saveCart();
    };

    removeCart(productId) {
        const newCart = []
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart
        this.saveCart()
    };

    updateQuantity(productId,newQuantity){
        this.cartItems.forEach((item)=>{
            if(item.productId===productId){
                item.quantity = newQuantity;
            }
        })
        this.saveCart()
    };
    
    updateDeliveryOptions(productId, deliveryOptionId){
        var matchingItem;
        this.cartItems.forEach((product)=>{
            if(productId===product.productId){
                matchingItem = product;
            }
        })
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveCart()
    };
}

const cart = new Cart('cart-oop');
const bussinessCart = new Cart('cart-bussiness');

console.log(cart);
console.log(bussinessCart)

console.log(bussinessCart instanceof Cart)