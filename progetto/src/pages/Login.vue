<template>
  <div id="container" class="md-layout md-alignment-top-center">
    <!--WELCOME-->
    <div class="md-layout-item md-size-100">
      <img src="../images/immaginelogin.png" />
    </div>

    <!--DIALOG LOGIN-->
    <md-dialog :md-active.sync="showDialog" id="popup">
      <md-dialog-title>Registrati</md-dialog-title>

      <md-dialog-content class="md-size-95">
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>

        <md-field>
          <label>Selezione un paese</label>
          <md-select v-model="selectedCountry" @md-selected="select">
            <md-option v-for="country in countries" :key="country.slug" :value="country.slug">{{ country.country }}</md-option>
          </md-select>
        </md-field>

        <md-field>
          <label>Immagine del profilo (link)</label>
          <md-input v-model="img"></md-input>
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Annulla</md-button>
        <md-button class="md-primary" :disabled="!username || !paese || !img" @click="checkUser()">Registrati</md-button>
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
      selectedCountry: '',
      //Dialog
      showDialog: false
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    //funzione per ottenere la lista di paesi associati al proprio slug
    load: function() {
      DataService.getCountries().then(data => {
        for(var i = 0; i < data.data.length; i++) {
          this.countries[i] = {
            country: data.data[i].Country,
            slug: data.data[i].Slug
          };
        }

        this.countries.sort(this.sortCountries);
      });
    },
    sortCountries: function(first, second) {
      if (first.country < second.country)
        return -1;
      if (first.country > second.country)
        return 1;

      return 0;
    },
    //funzione per controllare se un utente ha già effettuato il sign in
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
    //funzione richiamata quando viene selezionato un paese sull'autocomplete
    select: function(selected) {
        this.paese = selected;
    }
  }
}
</script>

<style>
.md-menu-content {
  z-index: 11 !important;
}

@media only screen and (max-device-width: 1000px) {
  #container {
    padding-top: 20px;
    padding-right: 32px;
    padding-left: 32px;
  }
}

@media only screen and (min-device-width: 1001px) {
  #container {
    padding-top: 20px;
    padding-right: 200px;
    padding-left: 200px;
  }
}
</style>
