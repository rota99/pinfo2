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

        <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
          <md-field :class="{'clicked': isClicked}">
            <label>Scrivi qualcosa...</label>
            <md-textarea v-model="postContent" md-autogrow></md-textarea>
          </md-field>
        </md-card-content>

        <md-card-actions class="md-layout-item md-size-100">
          <md-button class="md-icon-button" @click="sendPost()">
            <md-icon>send</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>

    <!--Snackbar-->
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>Il tuo post è stato pubblicato!</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>

    <div class="md-layout-item md-large-size-66 md-small-size-95">
      <!--Card per i post-->
      <!--questo div dovrebbe essere un for. per ogni post nel database, viene stampata una card-->
      <div v-for="post in postList">
        <md-card class="md-layout md-alignment-top-right addMargin">
          <!--in questa prima parte ci vanno immagine del profilo e username-->
          <md-card-header class="md-layout-item md-size-100">
            <md-avatar>
              <img :src="post.propic"/>
            </md-avatar>
            <md-card-header-text>
              <div id="titlePers" class="md-title">{{ post.username }}</div>
              <div id="subheadPers" class="md-subhead">{{ post.date }}</div>
            </md-card-header-text>
          </md-card-header>

          <!--qui ci va il contenuto del post-->
          <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
            <span>{{ post.postContent }}</span>
          </md-card-content>

          <!--questo invece è il bottone per il like-->
          <md-card-actions class="md-layout-item md-size-100">
            <md-button class="md-icon-button" @click="isClicked = !isClicked">
              <md-icon :class="{'clicked': isClicked}">favorite</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>

    <!--Messaggio che viene visualizzato quando non ci sono nuovi post-->
    <div class="md-layout-item md-large-size-66 md-small-size-100 addMargin" v-if="!postList">
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
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      showProgress: false,
      isClicked: false
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      DataService.getUserInfo(this.username).then((data) => {
        data.forEach(doc => {
          this.img = doc.data().proPic;
        });
      });
      this.getPost();
    },
    sendPost: function() {
      var id = Date.now() + this.username.toLowerCase();
      DataService.sendPost(this.postContent, id);
      this.showSnackbar = true;
      this.getPost();
    },
    getPost: function() {
      this.showProgress = true;
      this.postList.splice(0, this.postList.length);
      var userImg = [];
      var userPost = [];
      var tmp = [];

      DataService.getUsers().then(data => {
        data.forEach(function(doc) {
          userImg.push({
            username: doc.data().username,
            img: doc.data().proPic
          });
        });

        DataService.getPosts().then(data => {
          data.forEach(function(doc) {
            var d = new Date(doc.data().postDate.seconds * 1000);
            var day = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var dateString = day + "/" + month + "/" + year;
            userPost.push({
              username: doc.data().username,
              post: doc.data().postContent,
              date: dateString
            });
          });

          for(var i = 0; i < userImg.length; i++) {
            for(var j = 0; j < userPost.length; j++) {
              if(userImg[i].username == userPost[j].username) {
                this.postList.push({
                  username: userImg[i].username,
                  propic: userImg[i].img,
                  postContent: userPost[j].post,
                  date: userPost[j].date
                });
              }
            }
          }
          this.showProgress = false;
        });
      });
    }
  }
}

</script>

<style>
.md-content {
  margin: 0px;
  padding: 0px;
  border: none;
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

.clicked {
  fill: var(--md-theme-default-accent) !important;
  color: var(--md-theme-default-accent) !important;
}

#titlePers, #subheadPers {
  font-size: 14px;
}

#titlePers {
  font-weight: 500;
}
</style>
