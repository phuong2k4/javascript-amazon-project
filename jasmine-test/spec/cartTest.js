import { addCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test Suite; Function AddCart()',()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    })
    it('Adds an existing product to the cart ', ()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":2,"deliveryOptionId":"1"}]'
        )
    })
    
    it('Adds a new product to the cart ', ()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1}]'
        )
    })
})