<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="main-wrap">
        <div class="top">
          <div class="header">
            <a href="/">
              <span class="title">智能数字孪生平台</span>
            </a>
          </div>
        </div>
        <route-view></route-view>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from "@/components/layouts/RouteView"
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: "UserLayout",
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
    document.body.style.overflowY = 'hidden'
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
    document.body.style.overflowY = 'scroll'
  },
}
</script>

<style lang="less" scoped>
.main-wrap {
  margin-left: 6.5vw;
}
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #fff url(~@/assets/login-bg.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
    }

    .top {
      text-align: left;
      margin-bottom: 5.56vh;

      .header {
        height: 44px;
        line-height: 70px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 50px;
          color: rgba(255, 255, 255, .85);
          font-family: "PingFangSC-Semibold", "PingFang SC";
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>