<template>
  <div>
    <!--PROGRESS BAR-->
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <div id="containerCard" class="md-layout md-alignment-top-left">
      <!--LISTA OSSERVATI-->
      <md-card id="card" md-with-hover class="md-layout-item md-size-20 md-small-size-100" v-for="country in observedList" :key="country">
        <card-osservati
          :slug="country"
          @refresh="getObserved();" >
        </card-osservati>
      </md-card>
    </div>

    <!--EMPTY STATE-->
    <div class="md-alignment-top-center md-large-size-66 md-small-size-100" v-if="observedList.length == 0">
      <md-empty-state
        md-icon="no_sim"
        md-label="Non hai aggiunto ancora alcun paese."
        md-description="Cerca un paese da aggiungere alla lista.">
        <md-button :to="'/contagi/' + country" class="md-primary md-raised">Cerca un paese</md-button>
      </md-empty-state>
    </div>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      country: localStorage.getItem('country'),
      observedList: [],
      //progress bar
      showProgress: false
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.showProgress = true;
      this.getObserved();
    },
    //funzione che restituisce la lista dei paesi osservati da un utente
    getObserved: function() {
      this.observedList.splice(0, this.observedList.length);

      DataService.getObserved().then((data) => {
        this.observedList = data.slice();

        this.showProgress = false;
      });
    }
  }
}
</script>

<style>
.progressBar {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

#containerCard {
  width: 90%;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 10px;
}

@media only screen and (max-device-width: 960px) {
  #card {
    margin: 10px;
    margin-right: 0px;
    padding: 0px;
    height: 160px;
  }
}

@media only screen and (min-device-width: 961px) {
  #card {
    margin: 10px;
    padding: 0px;
    height: 160px;
  }
}
</style>
