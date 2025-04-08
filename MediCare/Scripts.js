// Mensaje de consola para verificar que el script está cargado
console.log("MediCare Supplies - Script cargado correctamente.");

// Lógica para el carrito
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.add-to-cart');
  const cartItems = document.getElementById('cart-items');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

  // Agregar productos al carrito
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const productName = boton.getAttribute('data-product');
      const cartItem = document.createElement('li');
      cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      cartItem.textContent = productName;

      // Botón para eliminar el producto del carrito
      const removeButton = document.createElement('button');
      removeButton.className = 'btn btn-danger btn-sm ms-3';
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', () => {
        cartItem.remove();
        if (cartItems.children.length === 0) {
          cartItems.innerHTML = '<li class="list-group-item text-center">Tu carrito está vacío.</li>';
        }
      });

      cartItem.appendChild(removeButton);

      // Si el carrito está vacío, elimina el mensaje predeterminado
      if (cartItems.children[0] && cartItems.children[0].textContent === 'Tu carrito está vacío.') {
        cartItems.innerHTML = '';
      }

      cartItems.appendChild(cartItem);

      // Mensaje en consola para confirmar que el producto se añadió
      console.log(`Producto añadido al carrito: ${productName}`);
    });
  });

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    cartItems.innerHTML = '<li class="list-group-item text-center">Tu carrito está vacío.</li>';
    console.log("El carrito ha sido vaciado.");
  });
});