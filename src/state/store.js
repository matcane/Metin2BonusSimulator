import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./item/itemSlice.js";
import snackbarReducer from "./snackbar/snackbarSlice.js";


export const store = configureStore({
    reducer: {
        item: itemReducer,
        snackbar: snackbarReducer
    },
});