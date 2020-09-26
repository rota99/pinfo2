<template>
  <div id="container" class="md-layout md-alignment-top-center">
    <!--404-->
    <div class="md-layout-item md-size-100">
      <img src="../images/immagine404_v2.png" />
    </div>

    <md-button :to="'/dashboard'" class="md-primary md-raised">Torna alla bacheca</md-button>
  </div>
</template>

<script>
</script>

<style>
@media only screen and (max-device-width: 1000px) {
  #container {
    padding-top: 20px;
    padding-right: 32px;
    padding-left: 32px;
  }
}

@media only screen and (min-device-width: 1001px) {
  #container {
    padding-top: 20px;
    padding-right: 200px;
    padding-left: 200px;
  }
}
</style>
