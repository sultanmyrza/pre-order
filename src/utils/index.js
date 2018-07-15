export function getTimes() {
  let times = [];
  for (let h = 12; h < 18; h++) {
    for (let m = 0; m <= 40; m += 20) {
      times.push(`${h}:${leftPad(m, 2)}`);
    }
  }
  return times;
}

export function getTables() {
  const tables = [];
  for (let table = 1; table < 10; table += 1) {
    tables.push(table);
  }
  return tables;
}

let products = undefined;
export function getProducts(productCategory) {
  if (products) {
    return products.filter(product => product.category === productCategory);
  }
  products = [];
  for (const category of ['hamburger', 'ramen', 'pizza', 'steak', 'popcorn']) {
    for (let id = 1; id < 15; id += 1) {
      products.push({
        id,
        category,
        title: `${category}:Product:${id}`,
        price: getRandomInt(5000, 10000),
        cookTimeInSec: getRandomInt(60 * 3, 60 * 10),
        categoryId: category,
      });
    }
  }
  return products.filter(product => product.category === productCategory);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function leftPad(number, targetLength) {
  var output = number + '';
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

export function formatTimeSecToMinWithSec(seconds) {
  return `${Math.floor(seconds / 60)} mins ${seconds % 60} secs`;
}

export function itemsFromDicToArray(itemsByIds) {
  if (itemsByIds === undefined) {
    return [];
  }
  return Object.keys(itemsByIds).map(key => itemsByIds[key]);
}
