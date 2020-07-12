<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary md-small-hide" md-theme="default">
        <div class="md-toolbar-section-start">
          <md-title>
            <span class="md-title">LockedIn</span>
          </md-title>
        </div>

        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-dashboard" md-label="Dashboard" :to="'/dashboard'"></md-tab>
            <md-tab id="tab-profilo" md-label="Profilo" :to="'/profilo/' + username"></md-tab>
            <md-tab id="tab-contagi" md-label="Contagi" :to="'/contagi/' + country"></md-tab>
          </md-tabs>
          <md-button class="md-icon-button" title="Logout" @click="logout()">
            <md-icon>exit_to_app</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>


      <md-app-content>
        <router-view></router-view>
      </md-app-content>

      <md-bottom-bar md-type="fixed" md-sync-route>
        <md-bottom-bar-item :to="'/dashboard'" exact md-label="Dashboard" md-icon="dashboard"></md-bottom-bar-item>
        <md-bottom-bar-item :to="'/profilo/' + username" md-label="Profilo" md-icon="person"></md-bottom-bar-item>
        <md-bottom-bar-item :to="'/contagi/' + country" md-label="Contagi" md-icon="insert_chart"></md-bottom-bar-item>
      </md-bottom-bar>
    </md-app>
  </div>
</template>

<script>
import DataService from './dataservice';

export default {
  name: 'App',
  data: function() {
    return {
      username: localStorage.getItem('username'),
      country: localStorage.getItem('country')
    }
  },
  methods: {
    logout: function() {
      DataService.logout();
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style>
.icon {
  width: 24px;
  height: 24px;
  z-index: 2;
}
</style>
