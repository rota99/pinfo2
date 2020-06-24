import axios from 'axios';
import firebase from '@firebase/app';
import '@firebase/firestore';

/*firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: ""
});

var db = firebase.firestore();*/

export default {
  isAuthenticated() {
    return !!localStorage.getItem('username');
  },
  login(username) {
    localStorage.setItem('username', username);
  },
  logout() {
    localStorage.removeItem('username');
  }
}
