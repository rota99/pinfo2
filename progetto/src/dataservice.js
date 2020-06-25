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
  getCountries(){
    return axios.get('https://api.covid19api.com/countries');
  }
}
