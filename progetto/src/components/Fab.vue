<template>
  <div>
    <md-button class="md-fab md-fab-bottom-right md-fixed" @click="addObserved()" v-if="!observedList.includes(this.$route.params.slug)">
      <md-icon>visibility</md-icon>
    </md-button>

    <md-button class="md-fab md-fab-bottom-right md-fixed" @click="removeObserved()" v-if="observedList.includes(this.$route.params.slug)">
      <md-icon>visibility_off</md-icon>
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
    getObserved: function() {
      this.observedList.splice(0, this.observedList.length);

      DataService.getObserved().then((data) => {
        this.observedList = data.slice();
      });
    },
    addObserved: function() {
      DataService.setObserved(this.$route.params.slug).then(() => {
        this.getObserved();
        this.$emit('newObserved');
      });
    },
    removeObserved: function() {
      DataService.removeObserved(this.$route.params.slug).then(() => {
        this.getObserved();
        this.$emit('observedRemoved');
      });
    }
  }
}
</script>
