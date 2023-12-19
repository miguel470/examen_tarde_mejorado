const padreCards = document.querySelector(".cards");

export function renderCardFoods(data) {
  for (const card of data) {
    padreCards.innerHTML += `
    <div class="col-md-4">
            <div class="card">
              <img data-img="${card.strCategoryThumb}" src="${
      card.strCategoryThumb
    }" class="card-img-top"
                alt="Imagen de comida" />
              <div class="card-body">
                <h5 class="card-title name">${card.strCategory}</h5>

                <p class="card-text description" data-description="${
                  card.strCategoryDescription
                }">${card.strCategoryDescription.slice(0, 20)}...</p>
                <p data-price=${card.price} class="card-text price">Precio: ${
      card.price
    }€</p>
                <a href="#" data-id=${
                  card.id
                } class="btn btn-link card-link anadir">Añadir</a>

                <a href="#" class="btn btn-link card-link">Editar</a>

                <a href="#" class="btn btn-link card-link">Borrar</a>

              </div>
            </div>
          </div>`;
  }
}
