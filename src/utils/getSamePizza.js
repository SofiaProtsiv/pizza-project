export default function getSamePizza(array, pizza) {
    const findPizza = array.find((item) => {
        if (
            item.id === pizza.id &&
            item.type === pizza.type &&
            item.size === pizza.size
        ) {
            return item;
        }
        return null;
    });

    return findPizza;
}