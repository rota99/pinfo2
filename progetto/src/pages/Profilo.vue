<template>
  <div>
    <md-card id="copertina">
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img src="https://scipy-lectures.org/_images/face.png">
        </md-card-media>

        <md-card-area>
          <div class="containerImgName">
            <md-avatar class="md-large" id="avatarCopertina">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" />
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
                  <span>Modifica l'immagine<br />di copertina</span>
                  <md-icon>wallpaper</md-icon>
                </md-menu-item>

                <md-menu-item>
                  <span>Modifica il tema</span>
                  <md-icon>style</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-large-size-66 addMargin">

        <!--Card per "Scrivi un post"-->
        <md-card class="md-layout md-alignment-top-right">
          <md-card-header class="md-layout-item md-size-100">
            <md-avatar>
              <img :src="this.img" />
            </md-avatar>
            <span class="md-title">{{ username }}</span>
          </md-card-header>

          <md-card-content class="md-layout-item md-size-95">
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

      <div class="md-layout-item md-large-size-66" v-if="this.postList">
        <!--Card per i post-->
        <!--questo div dovrebbe essere un for. per ogni post nel database, viene stampata una card-->
        <div class="addMargin">
          <md-card class="md-layout md-alignment-top-right">
            <!--in questa prima parte ci vanno immagine del profilo e username-->
            <md-card-header class="md-layout-item md-size-100">
              <md-avatar>
                <img />
              </md-avatar>
              <span class="md-title">{{ username }}</span>
            </md-card-header>

            <!--qui ci va il contenuto del post-->
            <md-card-content class="md-layout-item md-size-95">
              <span>contenuto</span>
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
export default {
  data: function() {
    return {
      username: localStorage.getItem('username')
    }
  }
}

</script>

<style>
/*.md-content {
  margin: 0px;
  padding: 0px;
  border: none;
  width: 100%;
}*/

#copertina {
  margin: 0px;
  padding: 0px;
  border: none;
  width: 100%;
  height: 375px;
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
  width: 200px;
  height: 200px;
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
