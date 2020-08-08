<template>
  <md-ripple>
    <md-card-header>
      <div id="header" class="md-title">{{ country }}</div>
    </md-card-header>

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
    getCountryName: function() {
      DataService.searchCountries(this.slug).then((data) => {
        this.country = data[0];
      });
    },
    removeObserved: function() {
      DataService.removeObserved(this.slug).then(() => {
        this.load();
      });
    },
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
