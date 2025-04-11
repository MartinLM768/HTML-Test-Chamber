
document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
//  const cartCountElement = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function groupCartItems(items) {
    const grouped = {};
    items.forEach(item => {
      if (grouped[item.name]) {
        grouped[item.name].quantity += 1;
      } else {
        grouped[item.name] = { ...item, quantity: 1 };
      }
    });
    return Object.values(grouped);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>No tienes productos en el carrito.</p>";
      cartTotalElement.textContent = "0.00";
      cartCountElement.textContent = "0";
      return;
    }

    const groupedItems = groupCartItems(cart);
    let total = 0;

    groupedItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const product = document.createElement("div");
      product.className = "d-flex justify-content-between align-items-center border p-3 mb-2 rounded";

      product.innerHTML = `
        <div>
          <strong>${item.name}</strong><br />
          $${itemTotal.toFixed(2)} (${item.quantity} x $${item.price.toFixed(2)})
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-1" data-action="decrease" data-name="${item.name}">−</button>
          <span class="me-1">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary me-3" data-action="increase" data-name="${item.name}">+</button>
          <button class="btn btn-sm btn-outline-danger" data-action="remove" data-name="${item.name}">Eliminar</button>
        </div>
      `;

      cartItemsContainer.appendChild(product);
    });

    cartTotalElement.textContent = total.toFixed(2);
  //  cartCountElement.textContent = cart.length;

    // Eventos para botones
    document.querySelectorAll("[data-action]").forEach(btn => {
      const action = btn.getAttribute("data-action");
      const name = btn.getAttribute("data-name");

      btn.addEventListener("click", () => {
        if (action === "increase") {
          const item = cart.find(i => i.name === name);
          if (item) cart.push(item);
        } else if (action === "decrease") {
          const index = cart.findIndex(i => i.name === name);
          if (index !== -1) cart.splice(index, 1);
        } else if (action === "remove") {
          cart = cart.filter(i => i.name !== name);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
      cart = [];
      localStorage.removeItem("cart");
      renderCart();
    }
  });

  renderCart();
});
