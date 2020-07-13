<template>
  <div class="md-layout md-alignment-top-center">
    <md-card id="copertina" class="md-small-size-100">
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
              <span class="md-title-pers">{{ username }}</span>
              <span id='bio' class="md-subhead">{{ bio }}</span>
            </md-card-header>
          </div>

          <md-card-actions>
            <md-button class="md-icon-button md-fab md-mini md-primary" md-menu-trigger :to="'/modifica_profilo/' + username" title="Modifica profilo">
              <md-icon>edit</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-large-size-66 md-small-size-100 addMargin">
        <!--Card per "Scrivi un post"-->
        <md-card class="md-layout md-alignment-top-right">
          <md-card-header class="md-layout-item md-size-100">
            <md-avatar>
              <img :src="this.img" />
            </md-avatar>
            <span class="md-title">{{ username }}</span>
          </md-card-header>

          <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
            <md-field>
              <label>Scrivi qualcosa...</label>
              <md-textarea v-model="postContent" md-autogrow></md-textarea>
            </md-field>
          </md-card-content>

          <md-card-actions class="md-layout-item md-size-100">
            <md-button class="md-icon-button" @click="sendPost()">
              <md-icon>send</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
      </div>
      <!--Snackbar-->
      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
        <span>Il tuo post è stato pubblicato!</span>
        <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
      </md-snackbar>

      <div class="md-layout-item md-large-size-66 md-small-size-100">
        <!--Card per i post-->
        <!--questo div dovrebbe essere un for. per ogni post nel database, viene stampata una card-->
        <div class="addMargin" v-for="post in postList">
          <md-card class="md-layout md-alignment-top-right">
            <!--in questa prima parte ci vanno immagine del profilo e username-->
            <md-card-header class="md-layout-item md-size-100">
              <md-avatar>
                <img :src="this.img" />
              </md-avatar>
              <span class="md-title">{{ username }}</span>
            </md-card-header>

            <!--qui ci va il contenuto del post-->
            <md-card-content class="md-layout-item md-large-size-95 md-small-size-100">
              <span>{{ post }}</span>
            </md-card-content>

            <!--questo invece è il bottone per il like-->
            <md-card-actions class="md-layout-item md-size-100">
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
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
      postContent: null,
      postList: [],
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false
    }
  },
  created:function() {
    this.load();
  },
  methods: {
    load: function() {
      this.getPropic();
      this.getCoverPic();
      this.getBio();
      this.getPost();
    },
    getPropic: function() {
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.img = doc.data().proPic;
        });
      });
    },
    getCoverPic: function() {
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.coverPic = doc.data().coverPic;
        });
      });
    },
    getBio: function() {
      DataService.getUserInfo(this.username).then((data)=>{
        data.forEach(doc=>{
          this.bio = doc.data().bio;
        });
      });
    },
    getPost: function() {
      DataService.getUserPost(this.username).then(data => {
        this.postList = data.slice();
        console.log(this.postList);
      });
    },
    sendPost: function() {
      DataService.sendPost(this.postContent);
      this.showSnackbar = true;
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
