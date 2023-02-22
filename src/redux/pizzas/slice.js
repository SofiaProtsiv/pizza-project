import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';

const initialState = {
    items: [],
    status: "pending",
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = "pending";
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "fulfilled";
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = "rejected";
            state.items = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;