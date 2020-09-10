<template>
  <!--DIV CHE CONTIENE IL DIV CHE CONTIENE LE CARDZ-->
  <div class="md-layout md-alignment-top-center" id="cardiv">
    <!--CARD PREVENZIONE-->
    <div class="md-layout-item md-large-size-60 md-medium-size-60 md-small-size-90  md-layout md-alignment-center">
      <!--DISTANZA-->
      <card-prevenzione
        icon="6_ft_apart"
        title="Mantieni almeno 1m di distanza"
        cardId="distanza">
      </card-prevenzione>
      <!--MASCHERINA-->
      <card-prevenzione
        icon="masks"
        title="Indossa sempre la mascherina quando non riesci a mantenere le distanze, ma soprattutto nei luoghi chiusi"
        cardId="mascherina" >
      </card-prevenzione>
      <!--IGIENE-->
      <card-prevenzione
        icon="sick"
        title="Evita di toccarti occhi, naso e bocca"
        cardId="donuts" >
      </card-prevenzione>
      <!--IGIENE PT.2-->
      <card-prevenzione
        icon="clean_hands"
        title="Lava e igienizza spesso le mani"
        cardId="igiene" >
      </card-prevenzione>
    </div>
  </div>
</template>

<style>
#cardiv {
  margin-top: 20px;
}

</style>
