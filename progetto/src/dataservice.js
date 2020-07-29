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
      querySnapshot.forEach(function() {
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
  //funzione per accedere al sito
  login(username,slug) {
    localStorage.setItem('username', username);
    localStorage.setItem('country', slug);
  },
  //funzione per uscire dal sito
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('country');
  },
  //funzione per registrasi
  signin(propic) {
    return db.collection('user').doc().set({
      country: localStorage.getItem('country'),
      username: localStorage.getItem('username'),
      proPic: propic,
      coverPic: 'https://i.ibb.co/WVvcTyc/patternvirussfondogiallo.png',
      bio: ''
    });
  },
  //funzione che prende i Paesi dall'API
  getCountries() {
    return axios.get('https://api.covid19api.com/countries');
  },
  //funzione che fa riferimento al database per le informazioni dell'utente
  getUserInfo(username) {
    return db.collection('user').where('username','==',username).get();
  },
  //funzione che prende tutti gli utenti per ottenere le immagini di profilo nella bacheca
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
  //funzione che prende i post degli utenti per la pagina di profilo
  getPosts() {
    return db.collection("post").get().then(function(querySnapshot) {
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
  //funzione che prende i post dell'utente e li stampa nel profilo
  getUserPost(username) {
    var postList = [];
    var i = 0;
    return db.collection('post').where('username', '==', username).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        var d = new Date(doc.data().postDate.seconds * 1000);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var dateString = day + "/" + month + "/" + year;

        postList[i] = {
          id: doc.data().postDate.seconds,
          postContent: doc.data().postContent,
          postDate: dateString
        };

        i++;
      });
      return postList;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return;
    });
  },
  //funzione che invia i post scritti dagli utenti
  sendPost(postContent, id) {
    return db.collection('post').doc(id).set({
      postContent: postContent,
      username: localStorage.getItem('username'),
      postDate: new Date()
    });
  },
  //funzione usata per l'aggiornamento dei dati
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
  //funzioni per la modifica immgine di profilo
  setProPic(username, propic) {
    var id = '';

    return this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        proPic: propic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //funzioni per la modifica l'immagine copertina
  setCoverPic(username, coverpic) {
    var id = '';

    return this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        coverPic: coverpic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //funzioni per la modifica la bio
  setBio(username, bio) {
    var id = '';

    return this.getId(username).then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        bio: bio
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  getObserved() {
    //funzione per ottenere quali sono i paesi osservati dall'utente
    var observedList = [];
    return db.collection('observed').where("username", "==", localStorage.getItem('username')).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        observedList.push(doc.data().country);
      });
      return observedList;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  setObserved(country) {
    var id = country + localStorage.getItem('username').toLowerCase();

    return db.collection('observed').doc(id).set({
      country: country,
      username: localStorage.getItem('username')
    });
  },
  removeObserved(country) {
    var id = country + localStorage.getItem('username').toLowerCase();

    return db.collection('observed').doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  },
  //funzioni che richiamano l'api per la visualizzazione di cards e grafici
  getDayOneTotalConfirmed(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/confirmed')
  },
  getDayOneTotalRecovered(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/recovered')
  },
  getDayOneTotalDeaths(slug) {
    return axios.get('https://api.covid19api.com/total/dayone/country/'+ slug +'/status/deaths')
  },
  //funzione di ricerca dei Paesi
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
