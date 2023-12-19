const url = "http://localhost:4000/categories/";

export function editFood(id, updateData) {
  fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error update");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => err.message);
}
