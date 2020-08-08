<template>
  <md-card class="firstCard md-layout md-alignment-top-right">
    <!--HEADER-->
    <md-card-header class="md-layout-item md-size-100">
      <md-avatar>
        <img :src="img" />
      </md-avatar>
      <span class="md-title">{{ username }}</span>
    </md-card-header>

    <!--CONTENT-->
    <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
      <md-field>
        <label>Scrivi qualcosa...</label>
        <md-textarea v-model="postContent" md-autogrow></md-textarea>
      </md-field>
    </md-card-content>

    <!--ACTIONS-->
    <md-card-actions class="md-layout-item md-size-100">
      <md-button class="md-icon-button" @click="sendPost()" :disabled="!postContent">
        <md-icon id="focus">send</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      postContent: null,
      img: null
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.getProPic();
    },
    //funzione utilizzata per salvare in una variabile locale l'indirizzo dell'immagine di profilo dell'utente
    getProPic: function() {
      DataService.getUserInfo(this.username).then((data) => {
        data.forEach(doc => {
          this.img = doc.data().proPic;
        });
      });
    },
    //funzione per inviare e salvare un post sul database
    sendPost: function() {
      var id = Date.now() + this.username.toLowerCase();
      DataService.sendPost(this.postContent, id);

      //dopo aver eseguito la query viene settata la variabile contentente il contenuto
      //del post a null, e viene eseguita nuovamente la richiesta al db per visualizzare i post
      this.postContent = null;
      this.showSnackbar = true;
      this.$emit('newPost');
    }
  }
}
</script>

<style>
#focus:focus, #focus:active {
  color: var(--md-theme-default-accent) !important;
  fill: var(--md-theme-default-accent) !important;
}
</style>
