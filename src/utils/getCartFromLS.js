import calcTotalPrice from "./calcTotalPrice.js";

export default function getCartFromLS() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items,
    totalPrice,
  };
};
