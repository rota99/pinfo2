<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-large-size-66 addMargin">

      <!--Card per "Scrivi un post"-->
      <md-card class="md-layout md-alignment-top-right">
        <md-card-header class="md-layout-item md-size-100">
          <md-avatar>
            <img :src="this.img" />
          </md-avatar>
          <span class="md-title">{{ username }}</span>
        </md-card-header>

        <md-card-content class="md-layout-item md-size-95">
          <md-field>
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
    <!--snackbar-->
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>Il tuo post è stato pubblicato!</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>

    <div class="md-layout-item md-large-size-66 addMargin">
      <!--Card per i post-->
      <!--questo div dovrebbe essere un for. per ogni post nel database, viene stampata una card-->
      <div v-for="post in postList">
        <md-card class="md-layout md-alignment-top-right">
          <!--in questa prima parte ci vanno immagine del profilo e username-->
          <md-card-header class="md-layout-item md-size-100">
            <md-avatar>
              <img />
            </md-avatar>
            <span class="md-title"> {{ post.username }}</span>
          </md-card-header>

          <!--qui ci va il contenuto del post-->
          <md-card-content class="md-layout-item md-size-95">
            <span>{{ post.content }}</span>
          </md-card-content>

          <!--questo invece è il bottone per il like-->
          <md-card-actions class="md-layout-item md-size-100">
            <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>

      <!--Messaggio che viene visualizzato quando non ci sono nuovi post-->
    <div class="md-layout-item md-large-size-66 addMargin">
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
      isInfinity: false
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
      DataService.sendPost(this.postContent);
      this.showSnackbar = true;
    },
    getPost: function() {
      var arrPost = [];
      var arrImg = [];

      DataService.getPost().then((data) => {
        data.forEach((doc) => {
          let un = doc.data().username;
          let c = doc.data().postContent;
          var obj = {
            username: un,
            content: c
          };
          arrPost.push(obj);
        });
      });

      DataService.getUsers().then((data) => {
        data.forEach((doc) => {
          let un = doc.data().username;
          let i = doc.data().proPic;
          var obj = {
            username: un,
            img: i
          };
          arrImg.push(obj);
        });
        console.log("Dentro ->" + arrImg);
      });

      console.log("Fuori ->" + arrImg);

      for(var i = 0; i < arrImg.length; i++)
      {
        console.log(i + "->" + arrImg[i]);
        console.log("qui");
      }

      for(var i = 0; i < arrImg.length; i++) {
        for(var j = 0; j < arrPost.length; j++) {
          if(arrImg[i].username == arrPost[j].username) {
            var u = arrPost[j].username;
            var c = arrPost[j].content;
            var i = arrImg[i].img;
            var obj = {
              username: u,
              img: i,
              content: c
            };
            this.postList.push(obj);
          }
        }
      }

      /*console.log(arrPost);
      console.log(arrImg);

      console.log(this.postList);*/
    }
  }
}

</script>

<style>
.md-elevation-4 {
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
}

.md-card-content {
  padding-bottom: 0px;
  padding-left: 30px;
}

.addMargin {
  margin-bottom: 16px;
}

div .addMargin:first-child {
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>
