import axios from 'axios';
import firebase from '@firebase/app';
import '@firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCCO5HeWTQLpOLy9RbqTD-K3dAdR4lbPKE",
  authDomain: "progettoinfo2.firebaseapp.com",
  projectId: "progettoinfo2"
});

var db = firebase.firestore();

export default {
  isAuthenticated() {
    return !!localStorage.getItem('username');
  },
  login(username) {
    localStorage.setItem('username', username);
  },
  logout() {
    localStorage.removeItem('username');
  },
  signin(country,propic) {
    return db.collection('user').doc().set({
      country:country,
      username:localStorage.getItem('username'),
      proPic:propic
    });
  },
  getCountries() {
    return axios.get('https://api.covid19api.com/countries');
  },
  getUserInfo() {
    return db.collection('user').where('username','==', localStorage.getItem('username')).get();
  },
  sendPost(content) {
    return db.collection('post').doc().set({
      postContent:content,
      username:localStorage.getItem('username'),
    });
  }
}
