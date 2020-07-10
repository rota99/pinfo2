<template>
  <div class="md-layout md-alignment-top-center">
    <md-card id="copertina">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img src="https://scipy-lectures.org/_images/face.png">
        </md-card-media>

        <md-card-area>
          <div class="containerImgName">
            <md-avatar class="md-large" id="avatarCopertina">
              <img :src="this.img" />
            </md-avatar>

            <md-card-header>
              <span class="md-title">{{ username }}</span>
              <span class="md-subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </md-card-header>
          </div>

          <md-card-actions>
            <md-menu md-size="big" md-direction="bottom-end">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item>
                  <span>Modifica l'immagine<br />di profilo</span>
                  <md-icon>insert_photo</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Modifica l'immagine<br />di copertina</span>
                  <md-icon>wallpaper</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Modifica la bio</span>
                  <md-icon>edit</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Modifica il tema</span>
                  <md-icon>style</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-actions>
        </md-card-area>
        <!--Dialog-->
        <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Preferences</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="Immagine profilo">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </md-tab>
          <md-tab md-label="Immagine copertina">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </md-tab>
          <md-tab md-label="Bio">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </md-tab>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Chiudi</md-button>
            <md-button class="md-primary" @click="showDialog = false">Salva</md-button>
          </md-dialog-actions>
        </md-dialog>
      <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button>


      </md-card-media-cover>
    </md-card>

    <!--<div v-for="post in postList">
      <span>{{ post }}</span>
    </div>-->
  </div>
</template>

<script>
import DataService from '../dataservice';

export default {
  data: function() {
    return {
      username: localStorage.getItem('username'),
      img: null,
      postList: [],
       showDialog: false
    }
  },
  created:function() {
    //this.load();
  },
  methods: {
    load: function() {
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.img = doc.data().proPic;
        });
      });

      this.getPost();
    },
    getPost: function() {
      DataService.getUserPost(this.username);
    }
  }
}
</script>

<style>
.md-content {
  margin-top: 0px;
  padding-top: 0px;
  border: none;
}

#copertina {
  margin: 0px;
  padding: 0px;
  border: none;
  width: 90%;
  height: 300px;
  background-color: #fafafa;
  box-shadow: none;
}

.containerImgName {
  display: flex;
  align-items: flex-start;
  position: fixed;
  margin-top: -25px;
}

.md-card-media {
  height: 250px;
}

#avatarCopertina {
  margin-left: 16px;
  margin-right: 16px;
  width: 128px;
  height: 128px;
  border-radius: 128px;
  border: 5px solid white;
}

.copertina img {
  margin: 0px;
  padding: 0px;
  border: none;
  height: 250px;
}

.md-card-content {
  padding-bottom: 0px;
  padding-left: 30px;
}

.addMargin {
  margin-bottom: 16px;
}

div .addMargin:first-child {
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>
