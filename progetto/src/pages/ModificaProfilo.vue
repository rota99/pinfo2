<template>
  <div class="md-layout md-alignment-top-center">
    <!--Dialog-->
    <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>Impostazioni</md-dialog-title>

    <md-tabs md-dynamic-height>
      <md-tab md-label="Modifica immagine profilo"></md-tab>
      <md-tab md-label="Modifica immagine copertina"></md-tab>
      <md-tab md-label="Bio">
        <md-field>
          <label>Textarea</label>
          <md-textarea v-model="textarea"></md-textarea>
        </md-field>
      </md-tab>
    </md-tabs>

      <md-button class="md-primary" @click="showDialog = false">Chiudi</md-button>
        <md-button class="md-primary" @click="showDialog = false">Salva</md-button>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true">Modifica</md-button>

    <md-card id="copertina">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img :src="this.coverPic" />
        </md-card-media>

        <md-card-area>
          <div class="containerImgName">
            <md-avatar class="md-large" id="avatarCopertina">
              <img :src="this.img" />
            </md-avatar>

            <md-card-header>
              <span class="md-title">{{ username }}</span>
              <span class="md-subhead">{{ bio }}</span>
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

                <!--<md-menu-item>
                  <span>Modifica il tema</span>
                  <md-icon>style</md-icon>
                </md-menu-item>-->
              </md-menu-content>
            </md-menu>
          </md-card-actions>
        </md-card-area>

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
      coverPic: null,
      username: localStorage.getItem('username'),
      img: null,
      bio: null,
      postList: [],
      showDialog: false,
      textarea: null
    }
  },
  created:function() {
    this.load();
  },
  methods: {
    load: function() {
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.img = doc.data().proPic;
        });
      });
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.coverPic = doc.data().coverPic;
        });
      });
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.bio = doc.data().bio;
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
.md-dialog {
    width: 900px;
}

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
