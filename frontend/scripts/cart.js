function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.includes(id)) cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Course added to cart!");
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("courses-container") || document.getElementById("cart-container");
  if (container && container.id === "courses-container") {
    for (let id in courses) {
      const c = courses[id];
      container.innerHTML += `
        <div class="course-card">
          <h2>${c.name}</h2>
          <p>${c.description}</p>
          <p>₹${c.price}</p>
          <button onclick="addToCart('${id}')">Add to Cart</button>
        </div>
      `;
    }
  } else if (container && container.id === "cart-container") {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    container.innerHTML = "";
    cart.forEach(id => {
      const c = courses[id];
      total += c.price;
      container.innerHTML += `<div><h3>${c.name}</h3><p>₹${c.price}</p></div>`;
    });
    document.getElementById("total").innerText = total;
  }
});
