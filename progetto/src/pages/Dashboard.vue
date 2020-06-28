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

    <div class="md-layout-item md-large-size-66" v-if="this.postList">
      <!--Card per i post-->
      <!--questo div dovrebbe essere un for. per ogni post nel database, viene stampata una card-->
      <div v-for="post in postList" class="addMargin">
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
            <span> {{ post.content }}</span>
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

    <!--Messaggio che viene visualizzato quando non ci sono post-->
    <div class="md-layout-item md-large-size-66 addMargin" v-if="!this.postList">
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
      postList: []
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
    },
    getPost: function() {
      DataService.getPost().then((data) => {
        data.forEach((doc) => {
          let un = doc.data().username;
          let c = doc.data().postContent;
          this.postList.push({
            username: un,
            content: c
          });
        });
      });
    }
  }
}
</script>

<style>
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
