<template>
  <div class="md-layout md-alignment-top-center">
    <md-progress-bar class="progressBar" md-mode="indeterminate" v-if="showProgress"></md-progress-bar>
    <!--Dialog ProPic-->
    <md-dialog :md-active.sync="showDialogProPic">
      <md-dialog-title>Modfica immagine profilo</md-dialog-title>
      <md-dialog-content class="size">
        <md-field>
          <label>Inserisci il nuovo link</label>
          <md-input v-model="newProPic"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogProPic = false">Chiudi</md-button>
        <md-button class="md-primary" @click="editProPic()">Salva</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--Dialog CoverPic-->
    <md-dialog :md-active.sync="showDialogCoverPic">
      <md-dialog-title>Modfica immagine di copertina</md-dialog-title>
      <md-dialog-content class="size">
        <md-field>
          <label>Inserisci il nuovo link</label>
          <md-input v-model="newCoverPic"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogCoverPic = false">Chiudi</md-button>
        <md-button class="md-primary" @click="editCoverPic()">Salva</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--Dialog Bio-->
    <md-dialog :md-active.sync="showDialogBio">
      <md-dialog-title>Modifica la bio</md-dialog-title>
      <md-dialog-content class="size">
        <md-field>
          <label>Inserisci la nuova bio</label>
          <md-textarea v-model="newBio" md-autogrow maxlength="125"></md-textarea>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogBio = false">Chiudi</md-button>
        <md-button class="md-primary" @click="editBio()">Salva</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-card id="copertina">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img v-if="this.coverPic === 'undefined'" src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_Admirals_of_the_Blue_Squadron_Royal_Navy.png" />
          <img v-else :src="this.coverPic" />
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
                <md-menu-item @click="showDialogProPic = true">
                  <span>Modifica l'immagine<br />di profilo</span>
                  <md-icon>insert_photo</md-icon>
                </md-menu-item>

                <md-menu-item @click="showDialogCoverPic = true">
                  <span>Modifica l'immagine<br />di copertina</span>
                  <md-icon>wallpaper</md-icon>
                </md-menu-item>

                <md-menu-item @click="showDialogBio = true">
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
      showDialogProPic: false,
      showDialogCoverPic: false,
      showDialogBio: false,
      newProPic: null,
      newCoverPic: null,
      newBio: null,
      showProgress: true
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
    },
    editProPic: function() {
      DataService.setProPic(this.username, this.newProPic);
      this.showDialog = false;

      this.load();
    },
    editCoverPic: function() {
      DataService.setCoverPic(this.username, this.newCoverPic);
      this.showDialog = false;

      this.load();
    },
    editBio: function() {
      DataService.setBio(this.username, this.newBio);
      this.showDialog = false;

      this.load();
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

.progressBar {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.size {
  width: 700px;
}

.md-card-media {
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

@media only screen and (max-device-width: 399px) {
  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    padding: 0px;
    border: none;
    width: 100%;
    height: 300px;
    background-color: white;
    box-shadow: none;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    position: fixed;
    margin-top: -75px;
    flex-direction: column;
    width: 100%;
    margin-left: -16px;
    text-align: center;
    color: rgba(0,0,0,0.87);
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }

  #bio {
    width: 75%;
  }

  .md-card-media.md-ratio-16-9 img {
    margin: 0px;
    padding: 0px;
    border: none;
    height: 150px;
    top: 30%;
  }
}

@media only screen and (min-device-width: 400px) and (max-device-width: 699px) {
  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    padding: 0px;
    border: none;
    width: 100%;
    height: 275px;
    background-color: white;
    box-shadow: none;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    position: fixed;
    margin-top: -75px;
    flex-direction: column;
    width: 100%;
    margin-left: -16px;
    text-align: center;
    color: rgba(0,0,0,0.87);
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }

  #bio {
    width: 75%;
  }

  .md-card-media.md-ratio-16-9 img {
    margin: 0px;
    padding: 0px;
    border: none;
    height: 150px;
    top: 30%;
  }
}

@media only screen and (min-device-width: 700px) and (max-device-width: 1060px) {
  .md-card-media-cover .md-card-header {
    align-items: center;
  }

  .md-card-backdrop {
    opacity: 0%;
  }

  #copertina {
    margin: 0px;
    padding: 0px;
    border: none;
    width: 100%;
    height: 350px;
    background-color: white;
    box-shadow: none;
  }

  .containerImgName {
    display: flex;
    align-items: center;
    position: fixed;
    margin-top: -75px;
    flex-direction: column;
    width: 100%;
    margin-left: -16px;
    text-align: center;
    color: rgba(0,0,0,0.87);
  }

  .md-card-media-cover .md-card-header {
    padding-top: 8px;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 128px;
    height: 128px;
    border-radius: 128px;
    border: 3px solid white;
  }

  .md-title-pers {
    font-size: 20px;
    letter-spacing: 0;
    line-height: 28px;
  }

  .md-card-media.md-ratio-16-9 img {
    margin: 0px;
    padding: 0px;
    border: none;
    height: 250px;
    top: 30%;
  }
}

@media only screen and (min-device-width: 1061px) {
  .containerImgName {
    display: flex;
    align-items: flex-start;
    position: fixed;
    margin-top: -25px;
  }

  #copertina {
    margin: 0px;
    padding: 0px;
    border: none;
    width: 100%;
    height: 300px;
    background-color: white;
    box-shadow: none;
  }

  #avatarCopertina {
    margin-left: 16px;
    margin-right: 16px;
    width: 128px;
    height: 128px;
    border-radius: 128px;
    border: 5px solid white;
  }

  .md-title-pers {
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
  }

  .copertina img {
    margin: 0px;
    padding: 0px;
    border: none;
    height: 250px;
  }
}
</style>
