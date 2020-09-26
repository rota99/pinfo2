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
  //------------------------LOGIN e LOGOUT------------------------
  //funzione per controllare se l'utente ha effettuato il login
  isAuthenticated() {
    return !!localStorage.getItem('username');
  },
  //funzione per controllare se l'utente risulta già registrato
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
  login(username, slug) {
    localStorage.setItem('username', username);
    localStorage.setItem('country', slug);
  },
  //funzione per effettuare il logout
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
  //------------------------RICHIESTE AL DB------------------------
  //------------------------informazioni su utenti e post------------------------
  getUserInfo(username) {
    return db.collection('user').where('username', '==', username).get();
  },
  //funzione che prende tutti gli utenti per ottenere le immagini di profilo nella bacheca
  getUsers(users) {
    var userList = [];

    return db.collection('user').where('username', 'in', users).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        userList.push({
          data: doc.data()
        });
      });
      return userList;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  },
  //funzione che prende i post degli utenti per la pagina di dashboard
  getPosts() {
    var postList = [];

    return db.collection('post').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        postList.push({
          docID: doc.id,
          data: doc.data()
        });
      });
      return postList;
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
          docID: doc.id,
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
  //------------------------set e delete post------------------------
  //funzione che invia i post scritti dagli utenti
  sendPost(postContent, id) {
    return db.collection('post').doc(id).set({
      postContent: postContent,
      username: localStorage.getItem('username'),
      postDate: new Date()
    });
  },
  //funzione per eliminare un post
  deletePost(id) {
    return db.collection('post').doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  },
  //------------------------update informazioni user------------------------
  //funzione utilizzata per recuperare l'id di un utente dato il suo username
  getId() {
    var id = '';
    return db.collection("user").where("username", "==", localStorage.getItem('username'))
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
  //funzione per la modifica dell'immgine di profilo
  setProPic(propic) {
    var id = '';

    return this.getId().then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        proPic: propic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //funzione per la modifica dell'immagine copertina
  setCoverPic(coverpic) {
    var id = '';

    return this.getId().then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        coverPic: coverpic
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //funzione per la modifica della bio
  setBio(bio) {
    var id = '';

    return this.getId().then(data => {
      id = data;

      return db.collection('user').doc(id).update({
        bio: bio
      })
      .then(function() {
          console.log("Document successfully updated!");
      });
    });
  },
  //------------------------mi piace------------------------
  //funzione che restituisce i mi piace messi da un utente
  getLiked() {
    var likedList = [];
    return db.collection('liked').where("username", "==", localStorage.getItem('username')).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        likedList.push(doc.data().postID);
      });
      return likedList;
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

  },
  //funzione per aggiungere mi piace a un post
  addLike(postID) {
    return db.collection('liked').doc(localStorage.getItem('username').toLowerCase() + postID).set({
      postID: postID,
      username: localStorage.getItem('username')
    });
  },
  //funzione per rimuovere mi piace a un post
  removeLike(postID) {
    return db.collection('liked').doc(localStorage.getItem('username').toLowerCase() + postID).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  },
  //------------------------osservati------------------------
  //funzione che restituisce i paesi osservati dall'utente
  getObserved() {
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
  //funzione per aggiungere un paese alla lista osservati
  setObserved(country) {
    var id = country + localStorage.getItem('username').toLowerCase();

    return db.collection('observed').doc(id).set({
      country: country,
      username: localStorage.getItem('username')
    });
  },
  //funzione per rimuovere un paese dalla lista osservati
  removeObserved(country) {
    var id = country + localStorage.getItem('username').toLowerCase();

    return db.collection('observed').doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  },
  //------------------------RICHIESTE ALL'API------------------------
  //funzione che prende i Paesi dall'API
  getCountries() {
    return axios.get('https://api.covid19api.com/countries');
  },
  //funzione di ricerca dei Paesi attraverso lo slug
  searchCountriesBySlug(slug) {
    return axios.get('https://api.covid19api.com/countries').then(data => {
      return data.data.filter((element) => element.Slug.toLowerCase().indexOf(slug.toLowerCase()) >= 0).map(element => element.Country);
    });
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
  }
}
