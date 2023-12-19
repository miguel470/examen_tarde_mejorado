export function insertOrder(data) {
  fetch("http://localhost:4000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al insertar order");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err + err.message));
}
