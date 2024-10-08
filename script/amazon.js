import { cart, addCart,updateQuantity } from "../data/cart.js";
import { products, LoadProducts } from "../data/products.js";
import { formatCurrency } from "./util/money.js";

LoadProducts(renderProductsGrid);

function renderProductsGrid(){
  var productHTML = ''
  updateQuantity()
  products.forEach((item)=>{
      const html = 
      `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${item.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${item.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${item.getStarURL()}">
              <div class="product-rating-count link-primary">
                ${item.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${item.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${item.extraInfoHTML()}
            
            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary cart-js-event"
              data-product-id="${item.id}"
            >
              Add to Cart
            </button>
          </div>
      `;
      productHTML += html;
  })

  const gridProduct = document.querySelector(".product-grid-js")
  gridProduct.innerHTML = productHTML;

  function cart_quantity(){
    document.querySelector(".cart-quantity").innerHTML = cart.length;
  }

  document.querySelectorAll(".cart-js-event").forEach((btn)=>{
      btn.addEventListener('click',()=>{
          const productId = btn.dataset.productId;
          addCart(productId)
          cart_quantity()
          updateQuantity();
      })
  })

  cart_quantity()
}
