<template>
  <div>
    <md-button class="md-icon-button md-list-action" @click="addObserved()" v-if="!observedList.includes(this.$route.params.slug)">
      <md-icon class="md-accent">visibility</md-icon>
    </md-button>

    <md-button class="md-icon-button md-list-action" @click="removeObserved()" v-if="observedList.includes(this.$route.params.slug)">
      <md-icon class="md-accent">visibility_off</md-icon>
    </md-button>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      observedList: []
    }
  },
  created: function() {
    this.getObserved();
  },
  methods: {
    //funzione per ottenere la lista dei paesi osservati da un utente
    getObserved: function() {
      this.observedList.splice(0, this.observedList.length);

      DataService.getObserved().then((data) => {
        this.observedList = data.slice();
      });
    },
    //funzione per aggiungere un paese alla lista osservati
    addObserved: function() {
      DataService.setObserved(this.$route.params.slug).then(() => {
        this.getObserved();
        this.$emit('newObserved');
      });
    },
    //funzione per rimuovere un paese dalla lista osservati
    removeObserved: function() {
      DataService.removeObserved(this.$route.params.slug).then(() => {
        this.getObserved();
        this.$emit('observedRemoved');
      });
    }
  }
}
</script>
