function sumUp(items, key) {
  let totalSum = Object.keys(items).reduce((sum, item) => {
    let price = items[item][key];
    let quantity = items[item].quantity;
    return sum + price * quantity;
  }, 0);
  return totalSum;
}

let itemsByIds = {
  1: {
    id: 1,
    price: 7900,
    cookTimeInSec: 180,
    quantity: 2,
  },
};

console.log(sumUp(itemsByIds, 'price'));
