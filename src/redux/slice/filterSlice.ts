import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title'
}

export type Sort ={
	name: string, 
	sortProperty:SortPropertyEnum,
}

interface FilterSliceState {
	inputValue: string,
    categoryId: number,
    currentPage: number,
    sort: Sort,
}

const initialState:FilterSliceState = {
    inputValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        },
    },
});

export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setInputValue } =
    filterSlice.actions;

export default filterSlice.reducer;
