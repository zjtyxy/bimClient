<template>

    <div class="pannel-box" :class="[customClass, animationClass]" ref="pannelBox" v-show="visible">
      <div class="pannel-content">
        <slot></slot>
      </div>

      <div v-if="mergeProps.closeable" class="pannel-close-icon" @click="closeModel">
        <a-icon type="close-circle"   theme="twoTone"  :style="{ fontSize: '16px', color: '#08c' }"></a-icon>
      </div>
    </div>

</template>

<script>
export default {
  name: 'MarsPannel',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    warpper: {
      type: String,
      required: false,
      default: 'app'
    },

    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false,
    },
    left: {
      type: String,
      required: false
    },
    right: {
      type: String,
      required: false,
      default:10
    },
    position: {
      type: Object,
      required: false,
      // default:function(){
      //   return{
      //   right:0,
      //     top:10,
      //     bottom: 75
      //   }
      // }
    },

    top: {
      type: String,
      required: false,
      default:10
    },
    bottom: {
      type: String,
      required: false
    },
    zIndex: {
      type: Number,
      required: false,
      default: 900
    },
    customClass: {
      type: String,
      required: false
    },
    closeable: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      target: null,
      selectedKeys: []
    }
  },
  computed: {
    mergeProps() {
      const newProps = {}
      for (const k in this._props) {
        if (this._props[k] === undefined) {
        // newProps[k] = '12'
        } else {
          newProps[k] = this._props[k]
        }
      }

      if (newProps.position) {
        newProps.left = newProps.position.left
        newProps.right = newProps.position.right
        newProps.top = newProps.position.top
        newProps.bottom = newProps.position.bottom
      }
      return newProps
    },
    animationClass() {
      const right = this.getCssNumber(this.mergeProps.right)
      if (right && right >= 0 && right < 100) {
        return 'fadein-right'
      }
      const left = this.getCssNumber(this.mergeProps.left)
      if (left || (left >= 0 && left < 100)) {
        return 'fadein-left'
      }
      const top = this.getCssNumber(this.mergeProps.top)
      if (left || (top >= 0 && top < 100)) {
        return 'fadein-down'
      }
      const bottom = this.getCssNumber(this.mergeProps.bottom)
      if (bottom || (bottom >= 0 && bottom < 100)) {
        return 'fadein-up'
      }
      return 'fadein-center'
    }

  },
  updated() {
    this.initPosition()
    this.initSize()
  },

  methods:
    {
      async closeModel() {
        if (this.mergeProps.beforeClose && typeof this.mergeProps.beforeClose === 'function') {
          const result = this.mergeProps.beforeClose()

          if (result instanceof Promise) {
            try {
              await result
              this.$emit('update:visible', false)
            } catch (err) {
              console.log('取消关闭')
            }
          } else if (result !== false) {
            this.$emit('update:visible', false)
          }
        } else {
          this.$emit('update:visible', false)
        }
      },
      getCssNumber(value) {
        if (typeof value === 'number') {
          return value
        }
        if (typeof value === 'string') {
          if (/^[0-9]*$/.test(value)) {
            return Number(value)
          }
          if (value.endsWith('px')) {
            value = value.replace('px', '')
            return Number(value)
          }
        }
        return null
      },
      initPosition() {
        const pannelStyle = this.$refs.pannelBox.style;
        // 层级位置
        pannelStyle.zIndex = this.mergeProps.zIndex
        // 横向位置初始化
        if (this.mergeProps.left !== undefined) {
          pannelStyle.left = this.antoUnit(this.mergeProps.left)
        } else if (this.mergeProps.right !== undefined) {
          pannelStyle.right = this.antoUnit(this.mergeProps.right)
          pannelStyle.left = 'initial'
        }
        // 纵向位置初始化
        if (this.mergeProps.top !== undefined) {
          pannelStyle.top = this.antoUnit(this.mergeProps.top)
        }
        if (this.mergeProps.bottom !== undefined) {
          pannelStyle.bottom = this.antoUnit(this.mergeProps.bottom)
        }
      },

// 初始化大小
    initSize() {
      const pannelStyle = this.$refs.pannelBox.style
      if (this.mergeProps.width) {
        pannelStyle.width = this.antoUnit(this.mergeProps.width)
      }
      if (!this.mergeProps.top || !this.mergeProps.bottom) {
        if (this.mergeProps.height) {
          pannelStyle.height = this.antoUnit(this.mergeProps.height)
        }
      }
    },

// 处理传入的单位问题
    antoUnit(value) {
      if (typeof value === 'number' || (typeof value === 'string' && /^[0-9]*$/.test(value))) {
        return `${value}px`
      } else {
        return value
      }
    }
  }
}
</script>


<style lang="less" scoped>
.pannel-box {
  position: absolute;
  padding: 10px 10px;
  border-radius: 4px;
  z-index: 1000;

  border: 1px solid #4db3ff70;
  background: linear-gradient(to left, #4db3ff, #4db3ff) left top no-repeat, linear-gradient(to bottom, #4db3ff, #4db3ff) left top no-repeat,
  linear-gradient(to left, #4db3ff, #4db3ff) right top no-repeat, linear-gradient(to bottom, #4db3ff, #4db3ff) right top no-repeat,
  linear-gradient(to left, #4db3ff, #4db3ff) left bottom no-repeat, linear-gradient(to bottom, #4db3ff, #4db3ff) left bottom no-repeat,
  linear-gradient(to left, #4db3ff, #4db3ff) right bottom no-repeat, linear-gradient(to left, #4db3ff, #4db3ff) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  background-color: #14141480;

  .pannel-content {
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }

  .pannel-close-icon {
    position: absolute;
    right: -8px;
    top: -8px;
    cursor: pointer;
  }
}

/**下面是 5个 动画 */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadein-right {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadein-left {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadein-up {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadein-down {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

@keyframes fadeInCenter {
  from {
    opacity: 0;
    transform: scale(0.1);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadein-center {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInCenter;
  animation-name: fadeInCenter;
}
</style>
