const URL = "http://localhost:4000/categories";

export async function findFoodApi(name) {
  const response = await fetch(URL + "?strCategory=" + name);
  const data = await response.json();
  return data;
}
