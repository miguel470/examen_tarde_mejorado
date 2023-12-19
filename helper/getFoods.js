const URL = "http://localhost:4000/categories";

export function getFoods(callback) {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al acceder a la api");
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((err) => console.log(err + err.message));
}

export async function getFoods2(callback){
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return callback(data);
  } catch (err) {
    console.log(err.message);
  }
}
