import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDIFjD9Ntp0gbbcakyYhhAtTulkjjy1a_o',
  authDomain: 'pre-order-63ea4.firebaseapp.com',
  databaseURL: 'https://pre-order-63ea4.firebaseio.com',
  projectId: 'pre-order-63ea4',
  storageBucket: 'pre-order-63ea4.appspot.com',
  messagingSenderId: '931788830385',
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
