<template>
  <div id="centerDiv" class="mapcontainer">
    <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>
  </div>
</template>

<script>
import JSelectPlot from '@/components/jeecgbiz/JSelectPlot'
import Map from '@/components/mars3d/Map.vue'
import { getAction, getActionAsync } from '@/api/manage'
import { axios } from '@/utils/request'
export default {
  name: 'BimProjectForm',
  components: {
    JSelectPlot, Map
  },
  props: {
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    const basePathUrl = window.basePathUrl || ''
    return {
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {},
      url: {
        add: '/bim/bimProject/add',
        edit: '/bim/bimProject/edit',
        queryById: '/bim/bimProject/queryById'
      }
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    },
  },
  beforeDestroy()
  {

  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
  },
  methods: {
    onMapload(map) {
      this.loadTileset(map, '地铁通道', 'http://127.0.0.1/BIM/totle/tileset.json', JSON.stringify({
        lng: 118.699194,
        lat: 31.978852,
        alt: 0.6
      }), 558)
    },
    edit(record) {
      this.model = Object.assign({}, record)
      this.visible = true
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
      var tiles3dLayer = new this.mars3d.layer.TilesetLayer(configs)
      map.addLayer(tiles3dLayer)
      this.attachTileset(map.viewer, tiles3dLayer.tileset, count)
    },
    async  attachTileset(viewer, tileset, count) {
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
          var sddd = await getActionAsync(basePath+'/info/'+parseInt(i)+'.json', {});
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

    }
  }
}
</script>

<style>
.mapcontainer {
  position: relative;
  height: 950px;
  overflow: hidden;
}
</style>