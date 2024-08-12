import { cart, removeCart, updateCartQuantity, updateQuantity, updateDeliveryOptions } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function renderOrderSummary(){
  let convertHtml = ''
  cart.forEach((item)=>{
    const productId = item.productId;
    let matchingProduct;
    products.forEach((productItem)=>{
        if(productId===productItem.id){
            matchingProduct = productItem;
        }
    })

    const deliveryOptionsId = item.deliveryOptionId;

    let deliveryOptioner;
    deliveryOptions.forEach((options)=>{
      if(options.id === deliveryOptionsId){
        deliveryOptioner = options;
      }
    })

    const time = dayjs();
    const deliveryDate = time.add(deliveryOptioner.deliveryDays,'days')
    const datestring = deliveryDate.format('dddd, MMMM D');
    const html = 
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input quantity-input-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                  <span class="save-quantity-link link-primary " data-product-id=${matchingProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" >
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProduct,item)}
              </div>
            </div>
        </div>
    `
    convertHtml+=html;
    updateCartQuantity();
  })
  document.querySelector(".order-summary").innerHTML = convertHtml;

  document.querySelectorAll(".delete-quantity-link")
  .forEach((link)=>{
      link.addEventListener("click", ()=>{
        updateQuantity()
        updateCartQuantity()
        const id = link.dataset.productId;
        removeCart(id);
        const container = document.querySelector(`.js-cart-item-container-${id}`)
        container.remove()
      })
  })


  document.querySelectorAll(".js-update-quantity")
    .forEach((updateTag)=>{
      updateTag.addEventListener("click",()=>{
        const id = updateTag.dataset.productId;
        document.querySelector(`.js-cart-item-container-${id}`).classList.add("is-editing-quantity")
      })
  })

  document.querySelectorAll(".save-quantity-link")
  .forEach((saveTag)=>{
    saveTag.addEventListener("click", ()=>{
      const id = saveTag.dataset.productId;
      // console.log(id)
      document.querySelector(`.js-cart-item-container-${id}`).classList.remove("is-editing-quantity")
      const newquantity = parseInt(document.querySelector(`.quantity-input-${id}`).value)
      const label_quantity = document.querySelector(`.quantity-label-${id}`)
      label_quantity.innerHTML = newquantity
      updateQuantity(id,newquantity);
      updateCartQuantity()
    })
  })


  document.querySelectorAll(".quantity-input")
  .forEach((item)=>{
    item.addEventListener("keypress", (event)=>{
      if (event.key === "Enter"){
        const id = item.dataset.productId;
        // console.log(id)
        document.querySelector(`.js-cart-item-container-${id}`).classList.remove("is-editing-quantity")
        const newquantity = parseInt(document.querySelector(`.quantity-input-${id}`).value)
        const label_quantity = document.querySelector(`.quantity-label-${id}`)
        label_quantity.innerHTML = newquantity
        updateQuantity(id,newquantity);
        updateCartQuantity()
      }
    })
  })

  function deliveryOptionsHtml(matchingProduct, cartItems){
    let html = ''
    deliveryOptions.forEach((deliveryOp)=>{
      const time = dayjs();
      const deliveryDate = time.add(deliveryOp.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOp.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOp.priceCents)} - `;
      const isChecked = deliveryOp.id === cartItems.deliveryOptionsId
      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOp.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element)=>{
    element.addEventListener("click",()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOptions(productId,deliveryOptionId);
      renderOrderSummary()
    })
  })
}

renderOrderSummary();