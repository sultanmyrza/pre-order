// import { database } from '../config/firebase';
// import orderSample from './orderSample.json';

const { database, auth } = require('../config/firebase');
const orderSample = require('./orderSample.json');

function firebaseAnonimSignIn() {
  auth()
    .signInAnonymously()
    .then(result => {
      console.log(result);
      alert('sign in anonymously');
    })
    .catch(function(error) {
      // Handle Errors here.
      alert('failed to sign in anonymously');
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

let updateCount = 0;

function sendOrder(order) {
  return new Promise((resolve, reject) => {
    const orderRef = database().ref(`orders/${order.consumer}/${order.orderNumber}`);
    orderRef
      .set({ ...order })
      .then(error => {
        if (error) {
          console.log(error);
        }
        resolve(orderRef);
      })
      .catch(error => {
        console.log('catch');
        console.log(error);
        reject(new Error(error.message));
      });
  });
}

module.exports = { firebaseAnonimSignIn, sendOrder };

// export function updateOrder(order) {
//   return new Promise((resolve, reject) => {
//     resolve(true);
//   });
// }

// export function addFirebaseListener(listener) {}
// export function removeFirebaseListener(listener) {}
