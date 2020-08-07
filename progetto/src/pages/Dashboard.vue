<template>
  <div class="md-layout md-alignment-top-center">
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>
    <div class="md-layout-item md-large-size-66 md-small-size-95 addMargin">

      <!--Card per "Scrivi un post"-->
      <scrivi-post @newPost="newPost();"></scrivi-post>
    </div>

    <!--Snackbar-->
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>Il tuo post è stato pubblicato!</span>
      <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>

    <div class="md-layout-item md-large-size-66 md-small-size-95">
      <!--Card per i post-->
      <div v-for="post in postList" :key="post.postID">
        <post
          :username="post.username"
          :date="post.date"
          :content="post.postContent"
          :propic="post.propic"
          :postID="post.postID">
        </post>
      </div>
    </div>

    <!--Messaggio che viene visualizzato quando non ci sono nuovi post-->
    <div class="md-layout-item md-large-size-66 md-small-size-100 addMargin" v-if="postList.length == 0">
      <md-empty-state
        md-icon="no_sim"
        md-label="Nessuna novità per ora!"
        md-description="Scrivi il primo post.">
      </md-empty-state>
    </div>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      postList: [],
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      showProgress: false,
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      //funzione per salvare in una variabile locale l'immagine del profilo dell'utente
      //e per richiedere al db tutti i post pubblicati
      this.getPost();
    },
    getPost: function() {
      //funzione per visualizzare tutti i post salvati nel database
      this.showProgress = true;

      //inizialmente viene svuotato l'array contentente gli oggetti relativi ai post
      //e successivamente vengono inizializzati tre array per eseguire un join
      //il primo array contiene username e immagine del profilo;
      //il secondo contiene username e contenuto del post
      this.postList.splice(0, this.postList.length);
      var userImg = [];
      var userPost = [];
      var users = [];

      DataService.getPosts().then(data => {
        data.forEach(function(doc) {
          var d = new Date(doc.data.postDate.seconds * 1000);
          var day = d.getDate();
          var month = d.getMonth() + 1;
          var year = d.getFullYear();
          var dateString = day + "/" + month + "/" + year;
          userPost.push({
            postID: doc.docID,
            ordinamento: doc.data.postDate.seconds,
            username: doc.data.username,
            post: doc.data.postContent,
            date: dateString
          });

          if(!users.includes(doc.data.username))
            users.push(doc.data.username);
        });

        DataService.getUsers(users).then(data => {
          data.forEach(function(doc) {
            userImg.push({
              username: doc.data.username,
              img: doc.data.proPic
            });
          });

          //dopo aver eseguito le due richieste vengono eseguiti due for per
          //controllare quando gli username combaciano per poter creare un oggetto unico
          for(var i = 0; i < userImg.length; i++) {
            for(var j = 0; j < userPost.length; j++) {
              if(userImg[i].username == userPost[j].username) {
                this.postList.push({
                  ordinamento: userPost[j].ordinamento,
                  postID: userPost[j].postID,
                  username: userImg[i].username,
                  propic: userImg[i].img,
                  postContent: userPost[j].post,
                  date: userPost[j].date
                });
              }
            }
          }

          this.orderPost();
          this.showProgress = false;
        });
      });
    },
    orderPost: function() {
      //bubble sort per ordinare i post in ordine decrescente per data di pubblicazione

      var n = this.postList.length - 1;
      var ultimoScambiato = n;
      var i = 0;

      while(ultimoScambiato > 0) {
        ultimoScambiato = 0;

        for(i = 0; i < n; i++) {
          if(this.postList[i].ordinamento < this.postList[i+1].ordinamento) {
            var tmp = this.postList[i];
            this.postList[i] = this.postList[i+1];
            this.postList[i+1] = tmp;

            ultimoScambiato = i;
          }
        }

        n = ultimoScambiato;
      }
    },
    newPost: function() {
      this.showSnackbar = true;
      this.getPost();
    }
  }
}
</script>

<style>
.md-content {
  margin: 0px !important;
  padding: 0px !important;
  border: none !important;
}

.md-card-content {
  padding-bottom: 0px;
  padding-left: 30px;
}

.progressBar {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.firstCard {
  margin-top: 20px;
  margin-bottom: 32px;
}

.addMargin {
  margin-bottom: 16px;
}
</style>
