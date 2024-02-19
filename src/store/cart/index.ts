/** @format */

import { createSlice, Dispatch } from '@reduxjs/toolkit';

interface Cart {
	total_price: number;
	items: {
		item_id: number;
		item_price: number;
	}[];
}

interface CartState {
	cartDetails: Cart;
}

const initialState: CartState = {
	cartDetails: {
		total_price: 0,
		items: [],
	},
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart(state, action) {
			const cart_item = action.payload;
			state.cartDetails = cart_item;
		},
	},
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
