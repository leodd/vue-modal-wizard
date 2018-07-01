<template>
  <div class="login-modal">
    <div class="box-left">
      <div class="content">
        <p class="title">SIGN IN</p>
        <div class="form">
          <input type="text" placeholder="User name">
          <input type="password" placeholder="Password">
          <button class="green">Sign in</button>
        </div>
        <p class="title">CREATE ACCOUNT</p>
        <div class="form">
          <p>A new free account
            <br><br>
            It's free to join and easy to use. Continue on to create your Steam account and get Steam, the leading digital solution for PC and Mac gamers.</p>
          <button class="gray">Join Steam</button>
        </div>
      </div>
    </div>
    <div class="box-right"></div>
  </div>
</template>

<script>
  export default {
    name: "LoginModal",

    methods: {
      _modalStyle () {
        return {
          lightboxColor: 'rgba(20, 20, 20, 0.95)',
          transition: 'pop-out',
          fadeDuration: '0.4s'
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-modal {
    width: 656px;
    height: 400px;
    background-color: #222;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 8px 100px -4px rgba(0, 0, 0, 0.5);

    .box-left {
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      .content {
        padding: 0 30px;

        .title {
          color: #666;
          margin: 0;
          padding: 25px 0 10px 0;
          font-size: 1.2em;
          text-align: left;
        }

        .form {
          text-align: left;

          input[type=text],
          input[type=password]{
            color: #666;
            display: block;
            box-sizing: border-box;
            margin-bottom: 6px;
            width: 100%;
            font-size: 0.8em;
            line-height: 2;
            border: 0;
            padding: 4px 8px;
            transition: all .5s;
            outline: none;
            background: #333;
            border-radius: 3px;
          }

          button {
            display: block;
            box-sizing: border-box;
            margin-bottom: 6px;
            font-size: 0.8em;
            line-height: 2;
            border: 0;
            padding: 4px 15px;
            transition: all .5s;
            outline: none;
            border-radius: 3px;
            cursor: pointer;

            &.green {
              color: #ffffff;
              background: #006166;
            }

            &.gray {
              color: #666;
              background-color: #333;
            }
          }

          p {
            color: #666;
            font-size: 0.8em;
            margin: 0 0 8px 0;
          }
        }

        .buttons {
          margin-top: 10px;
          text-align: left;


        }
      }
    }

    .box-right {
      color: rgba(55, 30, 72, 0.51);
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background-image: url('../../assets/iceland.jpg');
      background-size: cover;
    }
  }

  .pop-out-enter,
  .pop-out-leave-to {
    transform: translateY(20px);
  }

  .pop-out-enter-active,
  .pop-out-leave-active {
    /*do not use 'all' for transition, as positioning of modal will be animated*/
    transition: transform 0.4s;
  }
</style>
