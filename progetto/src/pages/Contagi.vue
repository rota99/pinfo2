<template>
  <div>
    <!--Progress Bar-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <div class="md-layout md-alignment-top-center">
      <!--Autocomplete-->
      <div class="md-layout-item md-large-size-60 md-small-size-90">
        <md-autocomplete id="searchBar" v-model="selectedCountry" :md-options="countries" md-layout="box" md-dense @md-changed="search" @md-selected="select">
          <label>Seleziona un paese</label>
        </md-autocomplete>
      </div>

      <!--Card numeri contagi-->
      <!--Card Positivi-->
      <div class="md-layout-item md-large-size-60 md-medium-size-60 md-small-size-90  md-layout md-alignment-top-center">
        <md-card id="positivi" class="md-layout-item md-medium-size-20 md-small-size-100">
          <md-ripple>
            <md-card-header class="header">
              <div class="md-title">{{ positivi }}</div>
              <div class="md-subhead">Positivi</div>
            </md-card-header>
          </md-ripple>
        </md-card>
        <!--Card Guariti-->
        <md-card id="guariti" class="md-layout-item md-medium-size-20 md-small-size-100">
          <md-ripple>
            <md-card-header class="header">
              <div class="md-title">{{ guariti }}</div>
              <div class="md-subhead">Guariti</div>
            </md-card-header>
          </md-ripple>
        </md-card>
        <!--Card Morti-->
        <md-card id="morti" class="md-layout-item md-medium-size-20 md-small-size-100">
          <md-ripple>
            <md-card-header class="header">
              <div class="md-title">{{ morti }}</div>
              <div class="md-subhead">Morti</div>
            </md-card-header>
          </md-ripple>
        </md-card>
      </div>
      <!--Sottotitoli informativo sull'ultimo aggiornamento dei dati-->
      <span class="md-subhead md-layout-item md-size-100 md-layout md-alignment-top-center header">
        <p class="md-layout-item">Dati aggiornati al: {{ data }}</p>
      </span>

      <!--Google Area Charts per ogni card-->
      <div class="md-layout-item md-large-size-60 md-small-size-100 md-layout md-alignment-top-center">
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataConfirmed" :options="chartOptionsConfirmed" />
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataRecovered" :options="chartOptionsRecovered" />
        <GChart class="md-layout-item md-size-100" type="AreaChart" :data="chartDataDeaths" :options="chartOptionsDeaths" />
      </div>

      <md-button class="md-fab md-fab-bottom-right md-fixed" @click="addObserved()" v-if="!observedList.includes(this.$route.params.slug)">
        <md-icon>visibility</md-icon>
      </md-button>

      <md-button class="md-fab md-fab-bottom-right md-fixed" @click="removeObserved()" v-if="observedList.includes(this.$route.params.slug)">
        <md-icon>visibility_off</md-icon>
      </md-button>
    </div>

    <!--Snackbar-->
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
      observedList: [],
      selectedCountry: null,
      //Barra di caricamento
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
      this.load();
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function () {
      this.showProgress = true;

      this.getConfirmed();
      this.getRecovered();
      this.getDeaths();
      this.getObserved();

      this.showProgress = false;
    },
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
    getObserved: function() {
      this.observedList.splice(0, this.observedList.length);

      DataService.getObserved().then((data) => {
        this.observedList = data.slice();

        this.showProgress = false;
      });
    },
    addObserved: function() {
      DataService.setObserved(this.$route.params.slug).then(() => {
        this.load();
        this.showSnackbarAdd = true;
      });
    },
    removeObserved: function() {
      DataService.removeObserved(this.$route.params.slug).then(() => {
        this.load();
        this.showSnackbarRemove = true;
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
  margin-bottom: 36px;
}

.header {
  text-align: center;
}

#positivi {
  color: rgba(247, 92, 3, 1);
}

#guariti {
  color: rgba(25, 178, 144, 1);
}

#morti {
  color: rgba(19, 21, 21, 1);
}

#positivi .md-subhead, #guariti .md-subhead, #morti .md-subhead {
  font-weight: bold;
}

@media only screen and (max-device-width: 960px) {
  #positivi, #guariti, #morti {
    margin-left: 0px;
    margin-right: 0px;
  }

  #positivi, #guariti {
    margin-bottom: 8px;
  }
}

@media only screen and (min-device-width: 961px) {
  #positivi, #guariti {
    margin-right: 8px;
  }

  #guariti, #morti {
    margin-left: 8px;
  }

  #positivi, #guariti {
    margin-bottom: 0px;
  }
}
</style>
