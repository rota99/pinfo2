<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-30 md-medium-size-50 md-xsmall-size-100">
      <md-card-header>
        <span class="md-title">Login</span>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field>
          <label>Paese</label>
          <md-select v-model="paese">
            <md-option v-for="country in countries" :key="country" value="country">{{ country }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Immagine del profilo (link)</label>
          <md-input v-model="img"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary md-raised" :disabled="(!username || !paese || !img)" @click="signIn()">Sign in</md-button>
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
    signIn: function() {
      DataService.login(this.username);
      this.$router.push({ path: '/' });
    },
    load: function() {
      DataService.getCountries().then(data => {
        for(var i=0; i<data.data.length; i++) {
          this.countries[i] = data.data[i].Country;
        }

        this.countries.sort();
      });
    }
  }
}
</script>

<style>
</style>
