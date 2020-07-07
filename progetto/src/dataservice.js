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
  login(username,slug) {
    localStorage.setItem('username', username);
    localStorage.setItem('country', slug);
  },
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('country');
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
  getDayOneTotalConfirmed(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug+'/status/confirmed')
  },
  getDayOneTotalRecovered(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug+'/status/recovered')
  },
  getDayOneTotalDeaths(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug+'/status/deaths')
  },
  searchCountries(text) {
    if(!text || text.length < 2) {
      return new Promise(resolve => {
        resolve([]);
      });
    }
    return axios.get('https://api.covid19api.com/countries').then(data => {
      return data.data.filter((element) => element.Country.toLowerCase().indexOf(text.toLowerCase()) >= 0).map(element => element.Country);
    });
  }
}
