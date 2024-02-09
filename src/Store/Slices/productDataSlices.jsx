import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsApi = createAsyncThunk('productData', async ({ minPrice, maxPrice, otherBrand, selectedBrand, selectedCategory }) => {
    try {
        const res = await axios.get(`https://dummyjson.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}${selectedBrand ? `&selectedBrand=${selectedBrand}` : ''}${selectedCategory ? `&selectedCategory=${selectedCategory}` : ''}`);
        return res.data.products;
    } catch (error) {
        console.log('error ==>', error);
    }
});

export const productDataSlices = createSlice({
    name: 'productsData',
    initialState: {
        Data: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(productsApi.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(productsApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Data = action.payload;
        });
        builder.addCase(productsApi.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});

export default productDataSlices.reducer;