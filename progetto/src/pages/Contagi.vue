<template>
  <div>
    <!--PROGRESS BAR-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <div class="md-layout md-alignment-top-center">
      <!--AUTOCOMPLETE-->
      <div class="md-layout-item md-large-size-60 md-small-size-90">
        <md-autocomplete id="searchBar" v-model="selectedCountry" :md-options="countries" md-layout="box" md-dense @md-changed="search" @md-selected="select">
          <label>Seleziona un paese</label>
        </md-autocomplete>
      </div>

      <md-list class="md-layout-item md-size-100 md-layout md-alignment-center-center">
        <md-list-item class="md-layout-item md-size-40">
          <span class="md-list-item-text md-title">{{ country }}</span>

          <tasto-lista
            @newObserved="showSnackbarAdd = true"
            @observedRemoved="showSnackbarRemove = true" >
          </tasto-lista>
        </md-list-item>
      </md-list>

      <!--CARD NUMERI-->
      <div class="md-layout-item md-large-size-60 md-medium-size-60 md-small-size-90  md-layout md-alignment-top-center">
      <!--POSITIVI-->
        <card-numeri
          title="Positivi"
          :count="positivi"
          cardId="positivi" >
        </card-numeri>
        <!--GUARITI-->
        <card-numeri
          title="Guariti"
          :count="guariti"
          cardId="guariti" >
        </card-numeri>
        <!--MORTI-->
        <card-numeri
          title="Morti"
          :count="morti"
          cardId="morti" >
        </card-numeri>
      </div>

      <!--ULTIMO AGGIORNAMENTO-->
      <span class="md-subhead md-layout-item md-size-100 md-layout md-alignment-top-center header">
        <p class="md-layout-item">Dati aggiornati al: {{ data }}</p>
      </span>

      <!--GOOGLE AREA CHARTS-->
      <div class="md-layout-item md-large-size-60 md-small-size-100 md-layout md-alignment-top-center">
        <!--POSITIVI-->
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataConfirmed" :options="chartOptionsConfirmed" />
        <!--GUARITI-->
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataRecovered" :options="chartOptionsRecovered" />
        <!--MORTI-->
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataDeaths" :options="chartOptionsDeaths" />
      </div>
    </div>

    <!--SNACKBAR-->
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbarAdd" md-persistent>
      <span>Paese aggiunto alla lista osservati!</span>
      <md-button class="md-accent" @click="showSnackbarAdd = false">OK</md-button>
    </md-snackbar>

    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbarRemove" md-persistent>
      <span>Paese rimosso dalla lista osservati.</span>
      <md-button class="md-accent" @click="showSnackbarRemove = false">OK</md-button>
    </md-snackbar>
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
      selectedCountry: null,
      country: null,
      //Progress bar
      showProgress: false,
      //Snackbar
      showSnackbarAdd: false,
      showSnackbarRemove: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      //Google Charts
      //Grafico dell'andamento dei Positivi
      chartDataConfirmed: [],
      chartOptionsConfirmed: {
        title: 'Positivi',
        hAxis: {
          title: 'Date',
          titleTextStyle: {color: '#333'},
          type: 'string'
        },
        vAxis: {
          title: 'Casi',
          minValue: 0
        },
        height: 300,
        legend: {
          position: 'none'
        },
        colors: ['#f75c03']
      },
      //Grafico dell'andamento dei Guariti
      chartDataRecovered: [],
      chartOptionsRecovered: {
        title: 'Guariti',
        hAxis: {
          title: 'Date',
          titleTextStyle: {color: '#333'}
        },
        vAxis: {
          title: 'Casi',
          minValue: 0
        },
        height: 300,
        legend: {
          position: 'none'
        },
        colors: ['#19B290']
      },
      //Grafico dell'andamento dei Morti
      chartDataDeaths: [],
      chartOptionsDeaths: {
        title: 'Morti',
        hAxis: {
          title: 'Date',
          titleTextStyle: {color: '#333'}
        },
        vAxis: {
          title: 'Casi',
          minValue: 0
        },
        height: 300,
        legend: {
          position: 'none'
        },
        colors: ['#131515']
      }
    }
  },
  watch: {
    $route: function() {
      //se l'indirizzo cambia, allora viene chiamata la funzione load()
      this.load();
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function () {
      this.showProgress = true;
      this.selectedCountry = null;
      this.getCountryName();
      this.getConfirmed();
      this.getRecovered();
      this.getDeaths();
      this.showProgress = false;
    },
    //funzione utilizzata per salvare in variabili locali i numeri per popolare card numeri e grafico positivi
    getConfirmed: function() {
      this.chartDataConfirmed.splice(0, this.chartDataConfirmed.length);

      var i = 0;
      var date = '';
      var anno = '';
      var mese = '';
      var giorno = '';
      var tmpDate = '';

      this.chartDataConfirmed.push(["Date", "Cases"]);

      DataService.getDayOneTotalConfirmed(this.$route.params.slug).then((data) => {
        for(i = 0; i < data.data.length; i++) {
          date = new Date(data.data[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataConfirmed.push([tmpDate, data.data[i].Cases]);

          if(i == (data.data.length - 1))
          {
            this.positivi = data.data[i].Cases;
            this.data = tmpDate;
          }
        }
      }).catch(function() {
        if(this.$route.params.slug != "italy")
          this.$router.push({path: 'contagi/italy'});

        var json = require('../assets/json/ConfirmedItaly.json');

        for(i = 0; i < json.length; i++) {
          date = new Date(json[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataConfirmed.push([tmpDate, json[i].Cases]);

          if(i == (json.length - 1))
          {
            this.positivi = json[i].Cases;
            this.data = tmpDate;
          }
        }
      });
    },
    //funzione utilizzata per salvare in variabili locali i numeri per popolare card numeri e grafico guariti
    getRecovered: function() {
      this.chartDataRecovered.splice(0, this.chartDataRecovered.length);

      var i = 0;
      var date = '';
      var anno = '';
      var mese = '';
      var giorno = '';
      var tmpDate = '';

      this.chartDataRecovered.push(["Date", "Cases"]);

      DataService.getDayOneTotalRecovered(this.$route.params.slug).then((data) => {
        for(i = 0; i < data.data.length; i++) {
          date = new Date(data.data[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataRecovered.push([tmpDate, data.data[i].Cases]);

          if(i == (data.data.length - 1)) {
            this.guariti = data.data[i].Cases;
          }
        }
      }).catch(function() {
        if(this.$route.params.slug != "italy")
          this.$router.push({path: 'contagi/italy'});

        var json = require('../assets/json/RecoveredItaly.json');

        for(i = 0; i < json.length; i++) {
          date = new Date(json[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataRecovered.push([tmpDate, json[i].Cases]);

          if(i == (json.length - 1)) {
            this.guariti = json[i].Cases;
          }
        }
      });
    },
    //funzione utilizzata per salvare in variabili locali i numeri per popolare card numeri e grafico morti
    getDeaths: function() {
      this.chartDataDeaths.splice(0, this.chartDataDeaths.length);

      var i = 0;
      var date = '';
      var anno = '';
      var mese = '';
      var giorno = '';
      var tmpDate = '';

      this.chartDataDeaths.push(["Date", "Cases"]);

      DataService.getDayOneTotalDeaths(this.$route.params.slug).then((data) => {
        for(i = 0; i < data.data.length; i++) {
          date = new Date(data.data[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataDeaths.push([tmpDate, data.data[i].Cases]);

          if(i == (data.data.length - 1)) {
            this.morti = data.data[i].Cases;
          }
        }
      }).catch(function() {
        if(this.$route.params.slug != "italy")
          this.$router.push({path: 'contagi/italy'});

        var json = require('../assets/json/DeathsItaly.json');

        for(i = 0; i < json.length; i++) {
          date = new Date(json[i].Date);
          anno = date.getFullYear();
          mese = date.getMonth() + 1;
          giorno = date.getDate();
          tmpDate = giorno + "/" + mese + "/" + anno;
          this.chartDataDeaths.push([tmpDate, json[i].Cases]);

          if(i == (json.length - 1)) {
            this.morti = json[i].Cases;
          }
        }
      });
    },
    getCountryName: function() {
      DataService.searchCountriesBySlug(this.$route.params.slug).then((data) => {
        this.country = data[0];
      });
    },
    //funzione richiamata quando si inizia la ricerca sull'autocomplete
    search: function(term) {
      this.countries = DataService.searchCountries(term);
    },
    //funzione richiamata quando viene selezionato un paese sull'autocomplete
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
.md-content {
  margin: 0px !important;
  padding: 0px !important;
  border: none !important;
}

.progressBar {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

#searchBar {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
