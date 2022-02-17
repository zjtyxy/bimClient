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
import { httpAction, getActionAsync } from '@/api/manage'
// 导入插件(其他插件类似，插件清单访问：http://mars3d.cn/dev/guide/start/architecture.html)
// echarts插件
// import 'mars3d-echarts'

// 为了方便使用,绑定到原型链，在其他vue文件，直接 this.mars3d 来使用
Vue.prototype.mars3d = mars3d
Vue.prototype.Cesium = mars3d.Cesium

export default {
  name: 'mars3dViewer',
  data() {
    return{
      tiles3dLayer:null,
    }

  },
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
  showCengByStyle(ceng) {
    var con = []
    for (var i = 1; i <= ceng; i++) {
      if (i < 10) {
        con.push(['${标高} ===\'F0' + i + '\' || ${底部约束} ===\'F0' + i + '\'', 'rgb(255, 255, 255)'])
      } else {
        con.push(['${标高} ===\'F' + i + '\' || ${底部约束} ===\'F' + i + '\'', 'rgb(255, 255, 255)'])
      }
    }
    con.push(['true', 'rgba(255, 255, 255,0)'])
    this.tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: con,
      },
    })
  },

  async attachTileset(viewer, tileset, count) {
    var dbIdToFeatures = {}
    var hiddenDbIds = []
    var selected = []
    var selectedDbId = -1
    var highlighted = []
    var expro = []
    var tilesetUrl = tileset.url || tileset.resource.url
    var lastIndex = tilesetUrl.lastIndexOf('/')
    var basePath = lastIndex === -1 ? '.' : tilesetUrl.substr(0, lastIndex)

    for (var i = 0; i < count; i++) {
      var sddd = await getActionAsync(basePath + '/info/' + parseInt(i) + '.json', {})
      var rst = JSON.parse(sddd)
      expro.push(rst.data)

    }

    function getFeatureDbId(feature) {
      if (Cesium.defined(feature) && Cesium.defined(feature.getProperty)) {
        return parseInt(feature.getProperty('DbId'), 10)
      }
      return -1
    }

    function unloadFeature(feature) {
      const dbId = getFeatureDbId(feature)
      const features = dbIdToFeatures[dbId]
      features.splice(features.findIndex(item => item.feature === feature), 1)

      if (dbId === selectedDbId) {
        selected.splice(selected.findIndex(item => item.feature === feature), 1)
      }

      if (dbId === highlighted) {
        highlighted.splice(highlighted.findIndex(item => item.feature === feature), 1)
      }
    }

    function loadFeature(feature) {
      const dbId = getFeatureDbId(feature)
      let features = dbIdToFeatures[dbId]
      var propsData = feature && feature.getProperty('Props')
      if (propsData) {

      } else {
        var dsa = expro[parseInt(dbId / 100)][dbId]
        if (dsa.categories) {

          for (var j = 0; j < dsa.categories.length; j++) {
            if (dsa.categories[j].name == '约束' || dsa.categories[j].name == '尺寸标注' || dsa.categories[j].name == '数据' || dsa.categories[j].name == '其他') {
              var names = dsa.categories[j].props.names
              var valus = dsa.categories[j].props.values
              for (var ii = 0; ii < names.length; ii++) {
                feature.setProperty(names[ii], valus[ii])
              }
            }

          }

        }

      }

      if (!Cesium.defined(features)) {
        dbIdToFeatures[dbId] = features = []

      }
      features.push(feature)

      if (hiddenDbIds.indexOf(dbId) > -1) {
        feature.show = false
      }
    }

    function processContentFeatures(content, callback) {
      const featuresLength = content.featuresLength
      for (let i = 0; i < featuresLength; ++i) {
        const feature = content.getFeature(i)
        callback(feature)
      }
    }

    function processTileFeatures(tile, callback) {
      const content = tile.content
      const innerContents = content.innerContents
      if (Cesium.defined(innerContents)) {
        const length = innerContents.length
        for (let i = 0; i < length; ++i) {
          processContentFeatures(innerContents[i], callback)
        }
      } else {
        processContentFeatures(content, callback)
      }
    }

    tileset.tileLoad.addEventListener(function (tile) {
      processTileFeatures(tile, loadFeature)
    })

    tileset.tileUnload.addEventListener(function (tile) {
      processTileFeatures(tile, unloadFeature)
    })

  },
    loadTileset(map, name, url, position, count) {
      var configs = {
        name: name,
        url: url,
        'maximumScreenSpaceError': 8,
        'maximumMemoryUsage': 1024,
        'show': true,
        showClickFeature: true,
        'luminanceAtZenith': 0.3,
        'scale': 1,
        'highlight': {
          'type': 'click',
        },
        popup: 'all',
        flyTo: true
      }
      try {
        var ps = JSON.parse(position)
        configs.position = ps
      } catch (err) {

      }
      this.tiles3dLayer = new this.mars3d.layer.TilesetLayer(configs)
      map.addLayer(this.tiles3dLayer)
      this.attachTileset(map.viewer,this.tiles3dLayer.tileset, count)
    },
    initStaticWidget(map, widget) {
      mars3d.widget.init(map, widget, window.basePathUrl || '/') // basePathUrl定义在public/index.html
    }
  },


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
