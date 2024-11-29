import { CartItem } from "../redux/slice/cart/type";

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}