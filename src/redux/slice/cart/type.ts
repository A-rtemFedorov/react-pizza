export type CartItem = {
	id: string,
	count: number,
	title: string,
	price: number,
	size: number,
	type: string,
	imageUrl: string,
	
}

export interface CartSliceType {
	items: CartItem[],
    totalPrice: number,
}