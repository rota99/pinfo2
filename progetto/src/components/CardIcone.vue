<template>
  <md-card :id="cardId" class="md-layout-item md-medium-size-20 md-small-size-100">
    <md-ripple>
      <!--HEADER-->
      <md-card-header class="header">
        <div class="md-subhead">{{ title }}</div>
      </md-card-header>
    </md-ripple>
  </md-card>
</template>
<script>
export default {
  //dati passati dall'elemento genitore
  props: [
    'title',
    'cardId'
  ]
}
</script>

<style>
.header {
  text-align: center;
}

#distanza {
  color: rgba(247, 92, 3, 1);
}

#mascherina {
  color: rgba(25, 178, 144, 1);
}

#donuts {
  color: rgba(19, 21, 21, 1);
}

#igiene {
  color: rgba(19, 21, 21, 1);
}

#distanza .md-subhead, #mascherina .md-subhead, #donuts .md-subhead, #igiene .md-subhead {
  font-weight: bold;
}

@media only screen and (max-device-width: 960px) {
  #distanza, #mascherina, #donuts, #igiene {
    margin-left: 0px;
    margin-right: 0px;
  }

  #distanza, #igiene {
    margin-bottom: 8px;
  }
}

@media only screen and (min-device-width: 961px) {
  #distanza, #igiene {
    margin-right: 8px;
  }

  #mascherina, #igiene {
    margin-left: 8px;
  }

  #distanza, #mascherina {
    margin-bottom: 0px;
  }
}
</style>
