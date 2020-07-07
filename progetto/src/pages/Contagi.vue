<template>
  <div  class="md-layout md-alignment-top-center">

    <!--Autocomplete-->
    <md-autocomplete class="md-layout-item md-size-66" v-model="selectedCountry" :md-options="countries" md-layout="box" md-dense @md-changed="search" @md-selected="select">
      <label>Seleziona un paese</label>
    </md-autocomplete>

    <!--Card numeri contagi-->
    <md-card md-with-hover class="md-layout-item md-size-15">
      <md-ripple>
        <md-card-header class="header">
          <div class="md-title">{{ positivi }}</div>
          <div class="md-subhead">Positivi</div>
        </md-card-header>
      </md-ripple>
    </md-card>

    <md-card md-with-hover class="md-layout-item md-size-15">
      <md-ripple>
        <md-card-header class="header">
          <div class="md-title">{{ guariti }}</div>
          <div class="md-subhead">Guariti</div>
        </md-card-header>
      </md-ripple>
    </md-card>

    <md-card md-with-hover class="md-layout-item md-size-15">
      <md-ripple>
        <md-card-header class="header">
          <div class="md-title">{{ morti }}</div>
          <div class="md-subhead">Morti</div>
        </md-card-header>
      </md-ripple>
    </md-card>
    <span class="md-layout-item md-size-10 md-subhead">
      Dati aggiornati al: {{ data }}
    </span>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      positivi: null,
      guariti: null,
      morti: null,
      data: null,
      countries: [],
      selectedCountry: null
    }
  },
  watch: {
    $route: function() {
      this.load();
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function () {
      DataService.getDayOneTotalConfirmed(this.$route.params.slug). then((data) => {
        var tmpObj = data.data.pop();
        this.positivi = tmpObj.Cases;
        var date = new Date(tmpObj.Date);
        var anno = date.getFullYear();
        var mese = date.getMonth() + 1;
        var giorno = date.getDate();
        this.data = giorno + "/" + mese + "/" + anno;
      });
      DataService.getDayOneTotalRecovered(this.$route.params.slug). then((data) => {
        this.guariti = data.data.pop().Cases;
      });
      DataService.getDayOneTotalDeaths(this.$route.params.slug). then((data) => {
        this.morti = data.data.pop().Cases;
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

        if(selectedSlug === this.$route.params.slug) return;

        this.$router.push({path: '/contagi/' + selectedSlug});
      });
    }
  }
}
</script>

<style>
.header {
  text-align: center;
}
</style>
