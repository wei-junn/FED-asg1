// Select modal elements
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const closeCartModal = document.getElementById("close-cart-modal");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count"); // For modal count
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");
const cartButtons = document.querySelectorAll(".add-to-cart");

// Initialize cart from localStorage or an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items in the modal
function renderCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear existing items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div>
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(li);
  });

  // Attach remove item functionality
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1); // Remove item
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      updateCartCount();
      renderCartItems();
    });
  });
}

// Update cart count
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Clear the cart
clearCartButton?.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
});

// Handle checkout
checkoutButton?.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  // Add checkout functionality or redirect here
});

// Allow duplicates when adding to cart
cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.parentElement;
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector("p").textContent;
    const productImg = productCard.querySelector("img").src;

    // Add item to the cart array (allow duplicates)
    cart.push({ name: productName, price: productPrice, image: productImg });

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Add animation feedback
    button.textContent = "Added!";
    button.classList.add("added");
    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.classList.remove("added");
    }, 1000);
  });
});

// Open cart modal
cartIcon.addEventListener("click", () => {
  cartModal.style.display = "flex"; // Show the modal
  renderCartItems();
});

// Close cart modal
closeCartModal.addEventListener("click", () => {
  cartModal.style.display = "none"; // Hide the modal
});

// Render cart items and update cart count on page load
renderCartItems();
updateCartCount();