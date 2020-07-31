<template>
  <div>
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>

    <div id="containerCard" class="md-layout md-alignment-top-left">
      <md-card id="card" md-with-hover class="md-layout-item md-size-20 md-small-size-100" v-for="country in observedList" :key="country">
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{ country }}</div>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-icon-button" @click="removeObserved(country)">
              <md-icon>visibility_off</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="goto(country)">
              <md-icon>open_in_new</md-icon>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </div>

    <!--Messaggio che viene visualizzato quando l'utente non ha selezionato alcun paese da osservare-->
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
    getObserved: function() {
      this.observedList.splice(0, this.observedList.length);

      DataService.getObserved().then((data) => {
        this.observedList = data.slice();

        this.showProgress = false;
      });
    },
    removeObserved: function(country) {
      DataService.removeObserved(country).then(() => {
        this.load();
      });
    },
    goto: function(country) {
      this.$router.push({path: '/contagi/' + country});
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

#card {
  margin: 10px;
  padding: 0px;
}
</style>
