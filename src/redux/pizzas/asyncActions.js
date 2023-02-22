import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;

        const { data } = await axios.get(`https://pizza-project-backend.herokuapp.com/pizzas`, {
            params: {
                _page: currentPage,
                category_like: category,
                _sort: sortBy,
                _order: order,
                q: search,
            },
        });

        return data;
    }
);