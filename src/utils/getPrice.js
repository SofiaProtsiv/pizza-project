export default function getPrice(size, type) {
    if (size === 26 && type === "thin") {
        return 0;
    }
    if (size === 26 && type === "traditional") {
        return 0;
    }
    if (size === 30 && type === "thin") {
        return 5;
    }
    if (size === 30 && type === "traditional") {
        return 5;
    }
    if (size === 40 && type === "thin") {
        return 7;
    }
    if (size === 40 && type === "traditional") {
        return 7;
    }
}
