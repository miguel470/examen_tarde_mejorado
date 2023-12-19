import { deleteFood } from "./helper/deleteFood";
import { editFood } from "./helper/editFood";
import { findFoodApi } from "./helper/findFoodApi";
import { getFoods, getFoods2 } from "./helper/getFoods";
import { insertOrder } from "./helper/insertOrder";
import { saveLS } from "./saveLS";
import { renderCardFoods } from "./src/components/renderCardFoods";
import { renderCardOrder } from "./src/components/renderCardOrder";

const cards = document.querySelector(".cards");
const order = document.querySelector(".order");
const btnFind = document.querySelector(".btn.btn-primary");
const inputFind = document.querySelector(".form-control.me-4");
let precioTotal = 0;

getFoods2((data) => renderCardFoods(data));

cards.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.textContent === "Añadir") {
    const card = e.target.closest(".card");
    card.classList.add("add");
    renderCardOrder(card.querySelector(".card-link").getAttribute("data-id"));

    const cardPrice = e.target.closest(".card");
    const elementPrice = cardPrice.querySelector(".price");
    const priceMas = Number(elementPrice.getAttribute("data-price"));
    precioTotal += priceMas;

    if (order.childElementCount === 1) {
      const divPago = document.createElement("div");
      divPago.classList.add("pago");

      const precioPago = document.createElement("span");
      precioPago.classList.add("pagoSpan");
      precioPago.textContent = precioTotal + "€";

      const botonPago = document.createElement("button");
      botonPago.textContent = "Pagar";

      divPago.appendChild(precioPago);
      divPago.appendChild(botonPago);
      order.appendChild(divPago);
    }
    order.querySelector(".pagoSpan").textContent = precioTotal + "€";
  }

  if (e.target.textContent === "Editar") {
    const inputEditName = document.createElement("input");
    inputEditName.classList.add("inputEditName");
    inputEditName.value = e.target
      .closest(".card-body")
      .querySelector(".name").textContent;

    const inputEditPrice = document.createElement("input");
    inputEditPrice.classList.add("inputEditPrice");
    inputEditPrice.value = Number(
      e.target
        .closest(".card-body")
        .querySelector(".price")
        .getAttribute("data-price")
    );

    const btnEditConfirm = document.createElement("button");
    btnEditConfirm.classList.add("btnEditConfirm");
    btnEditConfirm.textContent = "Confirmar";

    e.target.closest(".card-body").querySelector(".name").style =
      "display: none;";
    e.target.closest(".card-body").querySelector(".price").style =
      "display: none;";
    if (
      !(
        cards.querySelector(".inputEditName") &&
        cards.querySelector(".inputEditPrice")
      )
    ) {
      e.target.closest(".card-body").querySelector(".name").style =
        "display: none;";
      e.target.closest(".card-body").querySelector(".price").style =
        "display: none;";

      e.target.closest(".card-body").appendChild(inputEditName);
      e.target.closest(".card-body").appendChild(inputEditPrice);
      e.target.closest(".card-body").appendChild(btnEditConfirm);
    }
  }

  if (e.target.textContent === "Confirmar") {
    const id = Number(
      e.target
        .closest(".card-body")
        .querySelector(".anadir")
        .getAttribute("data-id")
    );
    const updateData = {
      id,
      strCategory: e.target
        .closest(".card-body")
        .querySelector(".inputEditName").value,
      strCategoryThumb: e.target
        .closest(".card")
        .querySelector(".card-img-top")
        .getAttribute("data-img"),
      strCategoryDescription: e.target
        .closest(".card")
        .querySelector(".description")
        .getAttribute("data-description"),
      price: Number(
        e.target.closest(".card-body").querySelector(".inputEditPrice").value
      ),
    };

    editFood(id, updateData);
    cards.innerHTML = "";
    getFoods((data) => renderCardFoods(data));

    e.target.closest(".card-body").querySelector(".name").style =
      "display: block;";
    e.target.closest(".card-body").querySelector(".name").textContent = e.target
      .closest(".card-body")
      .querySelector(".name").textContent;

    e.target.closest(".card-body").querySelector(".price").style =
      "display: block;";
    e.target.closest(".card-body").querySelector(".price").textContent =
      e.target.closest(".card-body").querySelector(".price").textContent;

    const target = e.target.closest(".card-body");

    target.querySelector(".inputEditName").remove();
    target.querySelector(".inputEditPrice").remove();
    target.querySelector(".btnEditConfirm").remove();
  }

  if (e.target.textContent === "Borrar") {
    const idDel = Number(
      e.target
        .closest(".card-body")
        .querySelector(".anadir")
        .getAttribute("data-id")
    );
    deleteFood(idDel);
    cards.innerHTML = "";
    getFoods((data) => renderCardFoods(data));
  }
});


order.addEventListener("click", (e) => {
  e.preventDefault();

  const cardsIzq = cards.querySelectorAll(".card");

  if (e.target.textContent === "Eliminar") {
    const cardOrder = e.target.closest(".card");
    for (const cardIzq of cardsIzq) {
      if (
        e.target.getAttribute("data-id") ===
        cardIzq.querySelector(".card-link").getAttribute("data-id")
      ) {
        cardIzq.classList.remove("add");
        cardOrder.remove();
      }
    }

    const cardPrice = e.target.closest(".card");
    const elementPrice = cardPrice.querySelector(".price");
    const priceMinus = Number(elementPrice.getAttribute("data-price"));
    precioTotal -= priceMinus;
    order.querySelector(".pagoSpan").textContent = precioTotal + "€";

    if (order.childElementCount === 2) {
      order.querySelector(".pago").remove();
    }
  }
  if (e.target.textContent === "Pagar") {
    const array = [];
    let obj = {};

    const cardsDer = order.querySelectorAll(".card");
    for (const card of cardsDer) {
      obj = {
        nombre: card.querySelector(".name").getAttribute("data-name"),
        precio: card.querySelector(".price").getAttribute("data-price"),
      };
      array.push(obj);
    }

    const data = {
      platos: array,
      precioTotal,
    };

    for (const cardDel of cardsDer) {
      cardDel.remove();
    }

    order.querySelector(".pago").remove();

    const cardsConOpacity = cards.querySelectorAll(".card");

    for (const cardQuitOpacity of cardsConOpacity) {
      cardQuitOpacity.classList.remove("add");
    }

    insertOrder(data);
    saveLS(data);
  }
});

btnFind.addEventListener("click", async (e) => {
  e.preventDefault();
  if (inputFind.value === "") {
    cards.innerHTML = "";
    getFoods((data) => renderCardFoods(data));
  } else {
    cards.innerHTML = "";
    const find = await findFoodApi(inputFind.value);
    cards.innerHTML = "";
    renderCardFoods(find);
  }
});

inputFind.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cards.innerHTML = "";
    getFoods((data) => renderCardFoods(data));
  }
});