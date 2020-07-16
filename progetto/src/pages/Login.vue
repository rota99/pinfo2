<template>
  <div class="md-layout md-alignment-top-center">
    <md-card class="md-layout-item md-size-30 md-medium-size-50 md-xsmall-size-100">
      <md-card-header>
        <span class="md-title">Login</span>
      </md-card-header>
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
      <md-card-actions>
        <md-button class="md-primary md-raised" :disabled="(!username || !paese || !img)" @click="checkUser()">Sign in</md-button>
      </md-card-actions>
    </md-card>
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
      countries: []
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
</style>
