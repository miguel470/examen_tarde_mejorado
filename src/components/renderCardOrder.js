const padreOrder = document.querySelector(".order");

export async function renderCardOrder(id) {
  const url = `http://localhost:4000/categories/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  padreOrder.innerHTML += `
  <div class="card">
    <img src=${data.strCategoryThumb} alt="">
    <span class="name" data-name=${data.strCategory}>${data.strCategory}</span>
    <span class="price" data-price=${data.price}>Precio: ${data.price}€</span>
    <button data-id=${data.id}>Eliminar</button>
  </div>

  `;
}
