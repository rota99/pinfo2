<template>
  <div>
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
        <!--CARD APP-->
        <card-prevenzione
        icon="phone_iphone"
        title="Se presente nel tuo Paese, scarica ed iscriviti ad un app indicata dal Governo per il tracciamento dell'andamento del virus!"
        cardId="app">
      </card-prevenzione>
      </div>
    </div>
    <!--DIV CHE CONTIENE I LINK UTILI-->
    <div class="md-layout md-alignment-bottom-left">
      <nav>
      <h1>Link da consultare:</h1>
        <ul>
            <li><a href="https://www.who.int/">Sito dell'Organizzazione Mondiale della Sanità</a></li>
            <li><a href="http://www.governo.it/it/coronavirus">Sito del Governo Italiano</a></li>
            <li><a href="http://www.salute.gov.it/nuovocoronavirus">Sito del Ministero della Salute</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style>
#cardiv {
  margin-top: 20px;
}

</style>
