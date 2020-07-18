<template>
  <div class="md-layout md-alignment-space-around">
    <!--Descrizione-->
    <!--<span class="md-layout-item" id="welcome">Come il tuo diario,<br />solo un po' più in grande.</span>-->
    <img src="../images/immaginelogin.png" class='md-layout-item md-size-50'/>


    <!--Dialog-->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Registrati</md-dialog-title>
        <!--Contenuto della card-->
        <md-card-content>
          <md-field>
            <label>Username</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <!--Autocomplete-->
          <md-autocomplete class="md-layout-item md-size-100" v-model="selectedCountry" :md-options="countries" @md-changed="search" @md-selected="select">
            <label>Seleziona un paese</label>
          </md-autocomplete>
          <md-field>
            <label>Immagine del profilo (link)</label>
            <md-input v-model="img"></md-input>
          </md-field>
        </md-card-content>
        <!--Bottone per registrarsi-->
        <md-card-actions>
          <md-button class="md-primary md-raised" :disabled="(!username || !paese || !img)" @click="checkUser()">Registrati</md-button>
        </md-card-actions>
      </md-card>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
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
        for(var i=0; i<data.data.length; i++) {
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
.md-autocomplete {
  z-index: 10;
}
#welcome {
  font-weight: 500;
  font-size: 40px;
  line-height: 50px;
  color: #ffca46;
}
</style>
