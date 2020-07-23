<template>
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
        <md-button class="md-icon-button" @click="sendPost()">
          <md-icon id="focus">send</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import DataService from '../dataservice';
import Dashboard from '../pages/Dashboard';

export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      postContent: null,
      img: null
    }
  },
  created: function() {
    DataService.getUserInfo(this.username).then((data) => {
      data.forEach(doc => {
        this.img = doc.data().proPic;
      });
    });
  },
  methods: {
    sendPost: function() {
      //funzione per inviare e salvare un post sul database
      var id = Date.now() + this.username.toLowerCase();
      DataService.sendPost(this.postContent, id);

      //dopo aver eseguito la query viene settata la variabile contentente il contenuto
      //del post a null, e viene eseguita nuovamente la richiesta al db per visualizzare i post
      this.postContent = null;
      Dashboard.postSended();
    }
  }
}
</script>

<style>
</style>
