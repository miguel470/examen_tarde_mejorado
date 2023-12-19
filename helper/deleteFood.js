const url = "http://localhost:4000/categories/";

export function deleteFood(id) {
  fetch(url + id, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al borrar");
      }
    })
    .catch((err) => err.message);
}
