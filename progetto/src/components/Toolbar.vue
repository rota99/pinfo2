<template>
  <div>
    <!--TOOLBAR-->
    <md-toolbar class="md-primary">
      <md-button id="hamburger-menu" class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">LockedIn</span>

      <!--TABS-->
      <div id="tabs" class="md-toolbar-section-end">
        <md-tabs class="md-primary" md-sync-route>
          <md-tab id="tab-dashboard" md-label="Bacheca" :to="'/dashboard'"></md-tab>
          <md-tab id="tab-profilo" md-label="Profilo" :to="'/profilo/' + username"></md-tab>
          <md-tab id="tab-contagi" md-label="Contagi" :to="'/contagi/' + country"></md-tab>
          <md-tab id="tab-osservati" md-label="Osservati" :to="'/osservati'"></md-tab>
          <md-tab id="tab-prevenzione" md-label="Prevenzione" :to="'/prevenzione'"></md-tab>

        </md-tabs>
        <md-button class="md-icon-button" title="Logout" @click="logout()">
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <!--DRAWER-->
    <md-drawer :md-active.sync="showNavigation" md-swipeable >
      <md-toolbar class="md-transparent md-medium" md-elevation="0">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-list-item>
              <md-avatar class="md-large">
                <img :src="img">
              </md-avatar>

              <span class="md-title">{{ username }}</span>
            </md-list-item>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="showNavigation = false">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>

      <md-divider></md-divider>

      <!--LIST-->
      <md-list md-sync-route>
        <md-list-item :to="'/dashboard'" @click="showNavigation = false">
          <md-icon>dashboard</md-icon>
          <span class="md-list-item-text">Bacheca</span>
        </md-list-item>

        <md-list-item :to="'/profilo/' + username" @click="showNavigation = false">
          <md-icon>person</md-icon>
          <span class="md-list-item-text">Profilo</span>
        </md-list-item>

        <md-list-item :to="'/contagi/' + country" @click="showNavigation = false">
          <md-icon>insert_chart</md-icon>
          <span class="md-list-item-text">Contagi</span>
        </md-list-item>

        <md-list-item :to="'/osservati'" @click="showNavigation = false">
          <md-icon>visibility</md-icon>
          <span class="md-list-item-text">Osservati</span>
        </md-list-item>

        <md-list-item :to="'/prevenzione'" @click="showNavigation = false">
          <md-icon>sanitizer</md-icon>
          <span class="md-list-item-text">Prevenzione</span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item @click="logout()">
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Logout</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  name: 'App',
  data: function() {
    return {
      username: localStorage.getItem('username'),
      country: localStorage.getItem('country'),
      img: null,
      showNavigation: false
    }
  },
  //funzione utilizzata per salvare in una variabile locale l'indirizzo dell'immagine di profilo dell'utente
  created: function() {
    DataService.getUserInfo(this.username).then((data) => {
      data.forEach(doc => {
        this.img = doc.data().proPic;
      });
    });
  },
  methods: {
    //funzione per effettuare il logout
    logout: function() {
      this.showNavigation = false;
      DataService.logout();
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style>
.md-list-item{
  list-style-type: none;
}

@media only screen and (max-device-width: 959px) {
  #hamburger-menu {
    display: block;
  }

  #tabs {
    display: none;
  }
}

@media only screen and (min-device-width: 960px) {
  #hamburger-menu {
    display: none;
  }

  #tabs {
    display: flex;
  }
}
</style>
