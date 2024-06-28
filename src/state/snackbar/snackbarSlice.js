import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSnackbar: false,
    messageSnackbar: {
        error: 0,
        message: "",
    },
    canCreateItem: true
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        removeSnackbar(state) {
            state.showSnackbar = false;
        },
        addSnackbar(state) {
            state.showSnackbar = true;
        },
        updateMessageSnackbar(state, action) {
            state.messageSnackbar = action.payload;
        },
        allowCreateItem(state) {
            state.canCreateItem = true;
        },
        preventCreateItem(state) {
            state.canCreateItem = false;
        }
    }
});

export const { removeSnackbar, addSnackbar, updateMessageSnackbar, allowCreateItem, preventCreateItem } = snackbarSlice.actions;


export default snackbarSlice.reducer;