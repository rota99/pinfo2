<template>
  <div id="app">
    <div class="page-container md-layout-column">
      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">LockedIn</span>

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
      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent md-large" md-elevation="0">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <md-avatar>
                <img />
              </md-avatar>
            </div>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="showNavigation = false">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </div>

          <div class="md-toolbar-row md-toolbar-offset">
            <h3 class="md-title">{{ username }}</h3>
          </div>
        </md-toolbar>

        <md-list md-sync-route>
          <md-list-item :to="'/dashboard'">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>

          <md-list-item :to="'/profilo/' + username">
            <md-icon>person</md-icon>
            <span class="md-list-item-text">Profilo</span>
          </md-list-item>

          <md-list-item :to="'/contagi/' + country">
            <md-icon>insert_chart</md-icon>
            <span class="md-list-item-text">Contagi</span>
          </md-list-item>

          <md-divider></md-divider>

          <md-list-item @click="logout()">
            <md-icon>exit_to_app</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-drawer>

      <md-content>
        <router-view></router-view>
      </md-content>
    </div>
  </div>
</template>

<script>
import DataService from './dataservice';

export default {
  name: 'App',
  data: function() {
    return {
      username: localStorage.getItem('username'),
      country: localStorage.getItem('country'),
      showNavigation: false
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
