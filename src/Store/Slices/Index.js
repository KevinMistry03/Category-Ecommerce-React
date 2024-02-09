import { configureStore } from "@reduxjs/toolkit";
import { productDataSlices } from "./productDataSlices";

const store = configureStore({
    reducer: {
        productsData: productDataSlices.reducer,
    },
});

export default store;
