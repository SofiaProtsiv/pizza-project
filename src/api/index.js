import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://pizza-project-backend.herokuapp.com";

export async function fetchPizzas() {
    const { data } = await axios.get("/pizzas");
    return data;
}

export async function fetchPizzasCategories() {
    const { data } = await axios.get("/categories");
    return data;
}

export async function fetchPizzasTypes() {
    const { data } = await axios.get("/types");
    return data;
}
