<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-large-size-66">
      <md-card>
        <md-card-header>
          <md-avatar>
            <!--struttura dell'immagine <img :src="url" />.
            l'url va preso dal db, quindi va fatta una funzione getUserInfo() in dataservice che recupera le informazioni
            dell'utente sapendo il suo username-->
            <img :src="this.img" />
          </md-avatar>
          <span class="md-title">{{ username }}</span>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Scrivi qualcosa...</label>
            <md-textarea v-model="postContent" md-autogrow></md-textarea>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button">
            <md-icon>send</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
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
      img: null
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function(){
      this.img = DataService.getUserInfo();
      //console.log(this.img);
      console.log(DataService.getUserInfo());
    }
  }
}
</script>

<style>
</style>
