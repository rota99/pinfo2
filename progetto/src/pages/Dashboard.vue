<template>
  <div class="md-layout md-alignment-top-center">
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>
    <div class="md-layout-item md-large-size-66 md-small-size-95 addMargin">

      <!--Card per "Scrivi un post"-->
      <md-card class="firstCard md-layout md-alignment-top-right">
        <md-card-header class="md-layout-item md-size-100">
          <md-avatar>
            <img :src="this.img" />
          </md-avatar>
          <span class="md-title">{{ username }}</span>
        </md-card-header>
        <!--Contenuto della card-->
        <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
          <md-field>
            <label>Scrivi qualcosa...</label>
            <md-textarea v-model="postContent" md-autogrow></md-textarea>
          </md-field>
        </md-card-content>
        <!--Icona per invio post-->
        <md-card-actions class="md-layout-item md-size-100">
          <md-button class="md-icon-button" @click="sendPost()" :disabled="!postContent">
            <md-icon id="focus">send</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>

    <!--Snackbar-->
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>Il tuo post è stato pubblicato!</span>
      <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>

    <div class="md-layout-item md-large-size-66 md-small-size-95">
      <!--Card per i post-->
      <div v-for="post in postList" :key="post.postID">
        <md-card class="md-layout md-alignment-top-right addMargin">
          <!--in questa prima parte ci vanno immagine del profilo e username-->
          <div @click="goto(post.username)" style="cursor: pointer; width: 100%;">
            <md-card-header class="md-layout-item md-size-100">
              <md-avatar>
                <img :src="post.propic"/>
              </md-avatar>
              <md-card-header-text>
                <div id="titlePers" class="md-title">{{ post.username }}</div>
                <div id="subheadPers" class="md-subhead">{{ post.date }}</div>
              </md-card-header-text>
            </md-card-header>
          </div>

          <!--Contenuto del post-->
          <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
            <span>{{ post.postContent }}</span>
          </md-card-content>

          <!--Icona per il link-->
          <md-card-actions class="md-layout-item md-size-100">
            <md-button class="md-icon-button" @click="addLike(post.postID)" v-if="!likedList.includes(post.postID)">
              <md-icon>favorite</md-icon>
            </md-button>

            <md-button class="md-icon-button" @click="removeLike(post.postID)" v-if="likedList.includes(post.postID)">
              <md-icon style="color: var(--md-theme-default-accent); fill: var(--md-theme-default-accent)">favorite</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
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
      username: localStorage.getItem('username'),
      postContent: null,
      img: null,
      postList: [],
      likedList: [],
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
      DataService.getUserInfo(this.username).then((data) => {
        data.forEach(doc => {
          this.img = doc.data().proPic;
        });
      });
      this.getPost();
      this.getLikes();
    },
    sendPost: function() {
      //funzione per inviare e salvare un post sul database
      var id = Date.now() + this.username.toLowerCase();
      DataService.sendPost(this.postContent, id);

      //dopo aver eseguito la query viene settata la variabile contentente il contenuto
      //del post a null, e viene eseguita nuovamente la richiesta al db per visualizzare i post
      this.postContent = null;
      this.showSnackbar = true;
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
    getLikes() {
      DataService.getLiked().then(data => {
        this.likedList = data.slice();
      });
    },
    addLike(postID) {
      DataService.addLike(postID);
      this.load();
    },
    removeLike(postID) {
      DataService.removeLike(postID);
      this.load();
    },
    goto: function(username) {
      console.log(username)
      this.$router.push({path: '/profilo/' + username});
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

#focus:focus, #focus:active {
  color: var(--md-theme-default-accent) !important;
  fill: var(--md-theme-default-accent) !important;
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


#titlePers, #subheadPers {
  font-size: 14px;
}

#titlePers {
  font-weight: 500;
}
</style>
