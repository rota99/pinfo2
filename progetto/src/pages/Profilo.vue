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
.md-content {
  margin: 0px;
  padding: 0px;
  border: none;
  width: 100%;
}

#copertina {
  margin: 0px;
  padding: 0px;
  border: none;
  width: 100%;
  height: 375px;
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
</style>
