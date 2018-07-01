<template>
  <div id="app">
    <div class="wrapper">
      <div class="header">
        <h1 class="logo">vue<br>modal<br>wizard</h1>
        <h3 class="title">🌈Transform Vue.js 2.0+ component into modal with powerful layout and transition support✨</h3>
        <a class="github" target="_blank" href="https://github.com/leodd/vue-modal-wizard">
          <img src="./assets/cta.svg">
          Github
        </a>
      </div>
      <div class="demo-box">

        <div class="brick" @click="openInfiniteModal">
          infinite modal demo
          <a class="code" @click.stop target="_blank" href="http://www.google.com">CODE</a>
        </div>

        <div class="brick" @click="openAdaptiveModal">
          adaptive demo
          <a class="code" @click.stop target="_blank" href="http://www.google.com">CODE</a>
        </div>

        <div class="brick" @click="openLoginModal">
          login demo
          <a class="code" @click.stop target="_blank" href="http://www.google.com">CODE</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import openInfiniteModal from './modals/InfiniteModal'
import openAdaptiveModal from './modals/AdaptiveModal'
import openLoginModal from './modals/LoginModal'

export default {
  name: 'app',

  data () {
    return {

    }
  },

  methods: {
    openInfiniteModal () {
      openInfiniteModal(1)
    },

    openAdaptiveModal () {
      openAdaptiveModal()
    },

    openLoginModal () {
      openLoginModal()
    }
  }
}
</script>

<style lang="scss">
@import 'modals/InfiniteModal/style';

#app {
  .wrapper {
    width: 85%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    text-align: left;

    .header {
      margin: 10px;

      .logo {
        color: #ffffff;
        font-size: 4em;
        text-align: left;
        line-height: 0.75em;
        margin: 0;
      }

      .title {
        margin-top: 20px;
        margin-bottom: 20px;
        color: rgba(255, 255, 255, 0.80);
        font-weight: normal;
      }

      .github {
        display: inline-block;
        text-align: left;
        color: rgba(255, 255, 255, 0.90);
        font-size: 1em;
        font-weight: bold;
        letter-spacing: 0.05em;
        padding: 0.6em 1em 0.6em 2.7em;
        border-radius: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        box-shadow: 0 3px 15px -4px rgba(0, 0, 0, 0.50);
        transition: background-color 200ms;
        cursor: pointer;
        position: relative;

        &:hover {
          background-color: #ed2d7f;
        }

        img {
          position: absolute;
          left: 0.4em;
          top: 0.4em;
        }
      }
    }

    .demo-box {
      margin-top: 20px;

      .brick {
        color: rgba(255, 255, 255, 0.5);
        float: left;
        height: 100px;
        width: 100px;
        margin: 10px;
        border-radius: 3px;
        padding: 10px;
        cursor: pointer;
        background-color: #ed2d7f;
        box-shadow: 0 3px 15px -4px rgba(0, 0, 0, 0.50);
        transition: all 500ms;
        text-align: left;
        font-size: 1.2em;
        font-weight: bold;
        line-height: 0.9em;
        z-index: 0;
        position: relative;
        overflow: hidden;

        &:hover {
          z-index: 1;
          transform: translate(0, -2px);
          box-shadow: 0 15px 80px -4px rgba(0, 0, 0, 0.50);
        }

        .code {
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100px;
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0.20);
          box-shadow: inset 0 3px 15px -4px rgba(0, 0, 0, 0.50);
          text-align: center;
          font-size: 0.8em;
          color: rgba(0, 0, 0, 0.50);
          transition: background-color 200ms;

          &:hover {
            background-color: rgba(0, 0, 0, 0.40);
          }
        }
      }
    }
  }
}
</style>
