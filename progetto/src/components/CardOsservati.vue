<template>
  <md-ripple>
    <!--HEADER-->
    <md-card-header>
      <div id="header" class="md-title">{{ country }}</div>
    </md-card-header>

    <!--ACTIONS-->
    <md-card-actions>
      <md-button class="md-icon-button" @click="removeObserved()">
        <md-icon>visibility_off</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="goto()">
        <md-icon>open_in_new</md-icon>
      </md-button>
    </md-card-actions>
  </md-ripple>
</template>

<script>
import DataService from '../dataservice';

export default {
  //dati passati dall'elemento genitore
  props: [
    'slug'
  ],
  data: function() {
    return {
      country: null
    }
  },
  created: function() {
    this.getCountryName();
  },
  methods: {
    //funzione per salvare in una variabile locale il nome di un paese dato lo slug
    getCountryName: function() {
      DataService.searchCountriesBySlug(this.slug).then((data) => {
        this.country = data[0];
      });
    },
    //funzione per rimuovere un paese dalla lista osservati
    removeObserved: function() {
      DataService.removeObserved(this.slug).then(() => {
        this.$emit('refresh');
      });
    },
    //funzione per reindirizzare l'utente al paese interessato
    goto: function() {
      this.$router.push({path: '/contagi/' + this.slug});
    }
  }
}
</script>

<style>
#header {
  height: 64px;
}
</style>
