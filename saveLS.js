export function saveLS(data) {
  if (!localStorage.getItem("OrderFood")) {
    localStorage.setItem("OrderFood", JSON.stringify(data));
  } else {
    const antiguoLS = JSON.parse(localStorage.getItem("OrderFood"));
    console.log(antiguoLS);
    localStorage.setItem(
      "OrderFood",
      JSON.stringify(Array.from(antiguoLS).concat(data))
    );
  }
}
