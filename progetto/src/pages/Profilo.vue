<template>
  <md-app md-waterfall md-mode="overlap">
    <md-app-toolbar class="md-primary md-large">
      <div class="md-toolbar-row">
        <md-avatar>
          <img :src="this.img" />
        </md-avatar>
        <span class="md-title">{{ username  }}</span>

      </div>
    </md-app-toolbar>
  </md-app>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      postContent: null,
      img: null
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      DataService.getUserInfo().then((data) => {
        data.forEach(doc => {
          this.img = doc.data().proPic;
        });
      });
    }
  }
}

</script>

<style>
.md-elevation-4 {
  box-shadow: none;
}

.md-app-content {
  margin: 0px;
  padding: 0px;
}
</style>
