<template>
  <md-card :id="cardId" class="md-layout-item md-large-size-15 md-small-size-80">
    <md-ripple>
      <!--HEADER-->
      <md-card-header id="headerCardPrevenzione">
        <div class="md-icon md-medium-size-50 md-small-size-70" style="grid-row-start: 1; grid-row-end: 2;">{{ icon }}</div>
        <div class="md-subhead md-size-50" style="grid-row-start: 2; grid-row-end: 3; align-self: center">{{ title }}</div>
      </md-card-header>
    </md-ripple>
  </md-card>
</template>
<script>
export default {
  //dati passati dall'elemento genitore
  props: [
    'icon',
    'title',
    'cardId'
  ]
}
</script>

<style>
#headerCardPrevenzione {
  text-align: center;
  height: 100%;
  margin-bottom: 0px;
}

#distanza, #mascherina, #donuts, #igiene, #telefono {
  color: rgba(19, 21, 21, 1);
}

#distanza .md-subhead, #mascherina .md-subhead, #donuts .md-subhead, #igiene .md-subhead, #telefono .md-subhead {
  font-weight: bold;
}

@media only screen and (max-device-width: 960px) {
  #distanza, #mascherina, #donuts, #igiene, #telefono {
    margin-bottom: 8px;
    height: 120px;
  }

  #headerCardPrevenzione {
    display: flex;
    flex-direction: column;
  }
}

@media only screen and (min-device-width: 1200px) {
  #headerCardPrevenzione {
    display: grid;
    grid-template-rows: 20% 80%;
    grid-template-columns: auto;
  }

  #distanza, #mascherina, #donuts, #igiene, #telefono {
    height: 190px;
  }

  #distanza, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #mascherina, #donuts {
    margin-right: 8px;
    margin-left: 8px;
  }

  #donuts, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #distanza, #mascherina {
    margin-bottom: 0px;
  }

  #igiene, #telefono {
    margin-left: 8px;
  }
}

@media only screen and (min-device-width: 961px) and (max-device-width: 1199px) {
  #headerCardPrevenzione {
    display: grid;
    grid-template-rows: 20% 80%;
    grid-template-columns: auto;
  }

  #distanza, #mascherina, #donuts, #igiene, #telefono {
    height: 230px;
  }

  #distanza, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #mascherina, #donuts {
    margin-right: 8px;
    margin-left: 8px;
  }

  #donuts, #igiene {
    margin-right: 8px;
    margin-left: 8px;
  }

  #distanza, #mascherina {
    margin-bottom: 0px;
  }

  #igiene, #telefono {
    margin-left: 8px;
  }
}
</style>
