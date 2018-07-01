<template>
  <div class="adaptive-modal">
    <div class="header">
      <div class="close" @click="$modal.close()">
        <img src="../../assets/close.svg">
        <p>ESC</p>
      </div>
    </div>
    <h5 class="hint">Please change the size of window and see what happens</h5>
    <p class="content">
      Iceland (/ˈaɪslənd/ (About this sound listen); Icelandic: Ísland [ˈistlant])[7] is a Nordic island country in the North Atlantic, with a population of 348,580 and an area of 103,000 km2 (40,000 sq mi), making it the most sparsely populated country in Europe.[8] The capital and largest city is Reykjavík. Reykjavík and the surrounding areas in the southwest of the country are home to over two-thirds of the population.
      <br><br>
      Iceland is volcanically and geologically active. The interior consists of a plateau characterised by sand and lava fields, mountains, and glaciers, and many glacial rivers flow to the sea through the lowlands. Iceland is warmed by the Gulf Stream and has a temperate climate, despite a high latitude just outside the Arctic Circle. Its high latitude and marine influence keep summers chilly, with most of the archipelago having a tundra climate.
      <br><br>
      According to the ancient manuscript Landnámabók, the settlement of Iceland began in 874 AD when the Norwegian chieftain Ingólfr Arnarson became the first permanent settler on the island.[9] In the following centuries, Norwegians, and to a lesser extent other Scandinavians, emigrated to Iceland, bringing with them thralls (i.e., slaves or serfs) of Gaelic origin. The island was governed as an independent commonwealth under the Althing, one of the world's oldest functioning legislative assemblies. Following a period of civil strife, Iceland acceded to Norwegian rule in the 13th century. The establishment of the Kalmar Union in 1397 united the kingdoms of Norway, Denmark, and Sweden. Iceland thus followed Norway's integration to that union and came under Danish rule, after Sweden's secession from that union in 1523. Although the Danish kingdom introduced Lutheranism forcefully in 1550, Iceland remained a distant semi-colonial territory in which Danish institutions and infrastructures were conspicuous by their absence. In the wake of the French Revolution and the Napoleonic Wars, Iceland's struggle for independence took form and culminated in independence in 1918 and the founding of a republic in 1944. Until the 20th century, Iceland relied largely on subsistence fishing and agriculture, and was among the poorest countries in Europe. Industrialisation of the fisheries and Marshall Plan aid following World War II brought prosperity, and Iceland became one of the wealthiest and most developed nations in the world. In 1994, it became a part of the European Economic Area, which further diversified the economy into sectors such as finance, biotechnology, and manufacturing.
    </p>
  </div>
</template>

<script>
  export default {
    name: "AdaptiveMmodal",

    methods: {
      _modalFlexPosition (w, h) {
        if (w > 800) {
          this.$el.style.width = '500px'
          this.$el.style.borderRadius = '5px'

          return {
            type: 'column',
            top: '50px',
            bottom: '50px'
          }
        }
        else {
          this.$el.style.width = 'auto'
          this.$el.style.borderRadius = '0'

          return {
            type: 'viewport'
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .adaptive-modal {
    width: 500px;
    height: auto;
    background-color: #fff;
    overflow: auto;
    box-shadow: 0 8px 100px -4px rgb(0, 0, 0);

    .header {
      height: 400px;
      background-image: url('../../assets/iceland.jpg');
      background-size: cover;

      .close {
        display: inline-block;
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 0.8em;
        font-weight: bold;
        cursor: pointer;

        p {
          margin: 0;
        };
      }
    }

    .hint {
      color: #000;
      font-weight: bold;
      font-size: 1em;
    }

    .content {
      color: rgba(0, 0, 0, 0.85);
      text-align: left;
      margin: 40px 30px;
    }
  }
</style>
