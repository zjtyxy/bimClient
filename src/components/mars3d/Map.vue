<template>
  <div :id="`mars3d-container${mapKey}`"
       :class="['mars3d-container', customClass]"></div>
</template>
<script>
import Vue from 'vue'
import  "@/assets/css/style.css";
import 'mars3d/dist/mars3d.css'
import 'mars3d-widget/dist/mars3d-widget.css'
import * as mars3d from 'mars3d'
import 'mars3d-widget'
// 导入插件(其他插件类似，插件清单访问：http://mars3d.cn/dev/guide/start/architecture.html)
// echarts插件
// import 'mars3d-echarts'

// 为了方便使用,绑定到原型链，在其他vue文件，直接 this.mars3d 来使用
Vue.prototype.mars3d = mars3d
Vue.prototype.Cesium = mars3d.Cesium

export default {
  name: 'mars3dViewer',

  props: {
    // 地图唯一性标识
    mapKey: {
      type: String,
      default: ''
    },
    // 初始化配置config.json的地址
    url: String,
    widgetUrl: String,
    // 自定义参数
    options: Object,
    customClass: {
      type: String,
      default: ''
    }
  },

  mounted() {
    mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
      // 构建地图
      this.initMars3d({
        ...data.map3d,
        ...this.options
      })
    })
  },

  beforeDestroy () {
    mars3d.widget.destroy();
    this[`map${this.mapKey}`].destroy()
    delete this[`map${this.mapKey}`]
  },

  methods: {
    initMars3d(mapOptions) {
      if (this[`map${this.mapKey}`]) {
        this[`map${this.mapKey}`].destroy()
      }

      // 创建三维地球场景
      var map = new mars3d.Map(`mars3d-container${this.mapKey}`, mapOptions)
      this[`map${this.mapKey}`] = map
      console.log('>>>>> 地图创建成功 >>>>', map)

      // 抛出事件
      this.$emit('onload', map)

      mars3d.Resource.fetchJson({ url: this.widgetUrl }).then((data) => {
        this.initStaticWidget(map, data)
      })
    },
    initStaticWidget(map, widget) {
      mars3d.widget.init(map, widget, window.basePathUrl || '/') // basePathUrl定义在public/index.html
    }
  }
}
</script>

<style >
.mars3d-container {
  height: 100%;
  overflow: hidden;
}

/* 重写Cesium的css */

/**cesium按钮背景色*/
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: #3f4854;
}

.cesium-geocoder-searchButton {
  background-color: #3f4854;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  background: rgba(63, 72, 84, 0.9);
}

.cesium-toolbar-button img {
  height: 100%;
}

.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}
.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium工具栏位置*/
.cesium-viewer-toolbar {
  top: auto;
  left: auto;
  right: 12px;
  bottom: 35px;
}

.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: right;
  clear: both;
  text-align: center;
}

.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  right: 40px;
  max-height: 700px;
  margin-bottom: 5px;
}

.cesium-navigation-help {
  top: auto;
  bottom: 0;
  right: 40px;
  transform-origin: right bottom;
}

.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: left;
  margin: 0 3px;
}

.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  top: 50px;
  background: rgba(63, 72, 84, 0.9);
}

/**左下工具栏菜单*/
.toolbar-dropdown-menu-div {
  background: rgba(43, 44, 47, 0.8);
  border: 1px solid #2b2c2f;
  z-index: 991;
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: none;
}

.toolbar-dropdown-menu {
  min-width: 110px;
  padding: 0;
}
.toolbar-dropdown-menu > li {
  padding: 0 3px;
  margin: 2px 0;
}
.toolbar-dropdown-menu > li > a {
  color: #edffff;
  display: block;
  padding: 4px 10px;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  white-space: nowrap;
  text-decoration: none;
}

.toolbar-dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu i {
  padding-right: 5px;
}
.ant-modal-body {
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>
