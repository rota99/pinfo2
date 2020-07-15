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
  isSignedIn(username, slug) {
    var control = 0;
    return db.collection('user').where('username', '==', username).where('country', '==', slug).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        control = 1;
      });
      if(control)
        return 1;
      else
        return 0;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
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
    return db.collection('user').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        return doc.data();
      });
      return querySnapshot;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  getPosts() {
    return db.collection("post").orderBy("username", "asc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        return doc.data();
      });
      return querySnapshot;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  getUserPost(username) {
    var postList = [];
    var i = 0;
    return db.collection('post').where('username', '==', username).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        postList[i] = doc.data().postContent;
        i++;
      });
      return postList;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return;
    });
  },
  sendPost(postContent) {
    return db.collection('post').doc().set({
      postContent: postContent,
      username: localStorage.getItem('username')
    });
  },
  getId(username) {
    var id = '';
    return db.collection("user").where("username", "==", username)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            id = doc.id;
        });
        return id;
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  },
  //funzioni per la modifica profilo
  setProPic(username, propic) {
    var id = '';

    this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        proPic: propic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  setCoverPic(username, coverpic) {
    var id = '';

    this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        coverPic: coverpic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  setBio(username, bio) {
    var id = '';

    this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        bio: bio
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //funzioni per Cards
  getDayOneTotalConfirmed(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/confirmed')
  },
  getDayOneTotalRecovered(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/recovered')
  },
  getDayOneTotalDeaths(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/deaths')
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
