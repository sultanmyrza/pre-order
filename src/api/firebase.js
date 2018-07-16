// import { database } from '../config/firebase';
// import orderSample from './orderSample.json';

const { database, auth } = require('../config/firebase');
const orderSample = require('./orderSample.json');

function firebaseAnonimSignIn() {
  auth()
    .signInAnonymously()
    .then(result => {
      console.log(result);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

let updateCount = 0;

function setOrder(order) {
  return new Promise((resolve, reject) => {
    const orderRef = database().ref(`orders/${order.consumer}/${order.orderNumber}`);
    orderRef
      .set({ ...order })
      .then(error => {
        if (error) {
          console.log(error);
        }
        orderRef.on('value', function(snapshot) {
          let updatedValue = snapshot.val();
          console.log(updatedValue);
          updateCount++;

          if (updateCount > 2) {
            orderRef.off();
          }
        });
        console.log('order pending');
      })
      .catch(error => {
        console.log('catch');
        console.log(error);
      });
  });
}

module.exports = { firebaseAnonimSignIn, setOrder };

// export function updateOrder(order) {
//   return new Promise((resolve, reject) => {
//     resolve(true);
//   });
// }

// export function addFirebaseListener(listener) {}
// export function removeFirebaseListener(listener) {}
