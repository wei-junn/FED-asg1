// Select elements
const clearCartButton = document.getElementById("clear-cart");
const cartItemsContainer = document.getElementById("cart-items-container");
const proceedCheckoutButton = document.getElementById("proceed-checkout");

// Retrieve cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items
function renderCheckoutCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear existing items

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div>
        <h3>${item.name}</h3>
        <p>${item.price}</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
}

// Clear the cart when the Clear Cart button is clicked
clearCartButton.addEventListener("click", () => {
  cart = []; // Empty the cart array
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  renderCartItems(); // Re-render the cart display
});

// Proceed to checkout
proceedCheckoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Proceeding to checkout...");
  // Add checkout functionality here (e.g., payment, order confirmation)
  cart = []; // Clear cart
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  renderCheckoutCartItems(); // Refresh checkout display
});

// Render cart items on checkout page load
renderCheckoutCartItems();
