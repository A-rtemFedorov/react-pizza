import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SearchPizzaParams = {
	category: string, 
	search: string, 
	order: string, 
	sortBy: string, 
	currentPage: string
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const { category, search, order, sortBy, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
        `https://6702b5c5bd7c8c1ccd3fa1e3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
});

type PizzaItem = {
	id: string,
	count: number,
	title: string,
	price: number,
	sizes: number[],
	types: number[],
	imageUrl: string,
	rating: number,
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
	items: PizzaItem[],
    status: Status,
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
});
export const selectDataPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;