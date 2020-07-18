<template>
  <div class="md-layout md-alignment-top-center">
    <!--Descrizione-->
    <img src="../images/immaginelogin.png" class="md-layout-item md-size-100" />

    <!--Dialog-->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Registrati</md-dialog-title>
        <!--Contenuto della card-->
      <md-dialog-content class="md-size-95">
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <!--Autocomplete-->
        <md-autocomplete v-model="selectedCountry" :md-options="countries" @md-changed="search" @md-selected="select">
          <label>Seleziona un paese</label>
        </md-autocomplete>
        <md-field>
          <label>Immagine del profilo (link)</label>
          <md-input v-model="img"></md-input>
        </md-field>
      </md-dialog-content>
      <!--Bottone per registrarsi-->
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Annulla</md-button>
        <md-button class="md-primary" @click="checkUser()">Registrati</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Registrati</md-button>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: '',
      paese: '',
      img: '',
      countries: [],
      showDialog: false
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    checkUser: function() {
      DataService.isSignedIn(this.username, this.paese).then(data => {
        if(data) {
          DataService.login(this.username, this.paese);
        }
        else {
          DataService.login(this.username, this.paese);
          DataService.signin(this.img);
        }
      });

      this.$router.push({path: '/'});
    },
    load: function() {
      DataService.getCountries().then(data => {
        for(var i = 0; i < data.data.length; i++) {
          this.countries[i] = {
            country: data.data[i].Country,
            slug: data.data[i].Slug
          };
        }
      });
    },
    search: function(term) {
      this.countries = DataService.searchCountries(term);
    },
    select: function(selected) {
      var selectedSlug = '';

      DataService.getCountries().then(data => {
        for(var i=0; i<data.data.length; i++) {
          if(data.data[i].Country == selected)
            selectedSlug = data.data[i].Slug
        }
        this.paese = selectedSlug;
      });
    }
  }
}
</script>

<style>
.md-content {
  padding: 32px 200px 32px;
}

.md-menu-content {
  z-index: 11;
}
</style>
