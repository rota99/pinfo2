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
      country: country,
      username: localStorage.getItem('username'),
      proPic: propic
    });
  },
  getCountries() {
    return axios.get('https://api.covid19api.com/countries');
  },
  getUserInfo(username) {
    return db.collection('user').where('username','==',username).get();
  },
  getUsers() {
    return db.collection('user').get();
  },
  getPost() {
    return db.collection('post').get();
    //return db.collection("post").doc().collection("user").get();
  },
  getUserPost(username) {
    db.collection('post').where('username', '==', username).get().then(data => {
      var i = 0;
      var postList = [];
      data.forEach(doc => {
        if(doc.data().postContent != null) {
          postList[i] = {id: i, postContent: doc.data().postContent};
          i++;
        }
      });
      return postList;
    });
  },
  sendPost(postContent) {
    return db.collection('post').doc().set({
      postContent: postContent,
      username: localStorage.getItem('username')
    });
  },
  getDayOneLiveConfirmed() {
    return axios.get('https://api.covid19api.com/dayone/country/italy/status/confirmed/live')
  },
  getDayOneLiveRecovered() {
    return axios.get('https://api.covid19api.com/dayone/country/italy/status/recovered/live')
  },
  getDayOneLiveDeaths() {
    return axios.get('https://api.covid19api.com/dayone/country/italy/status/deaths/live')
  }
}
