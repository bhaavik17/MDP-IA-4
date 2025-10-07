// ===== Smooth Scroll =====
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

// ===== Image Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3000);

// ===== Cart Functionality =====
let cart = [];

const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");

// Open Cart
cartToggle.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("active");
});

// Close Cart
cartClose.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("active");
});

// Add to Cart Buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} (₹${item.price})</span>
      <div class="cart-controls">
        <button class="decrease">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase">+</button>
        <button class="remove">Remove</button>
      </div>
    `;

    div.querySelector(".decrease").addEventListener("click", () => changeQuantity(item.name, -1));
    div.querySelector(".increase").addEventListener("click", () => changeQuantity(item.name, 1));
    div.querySelector(".remove").addEventListener("click", () => removeItem(item.name));

    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(0);
}

function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) removeItem(name);
    updateCartUI();
  }
}

function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  updateCartUI();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
  }
});
