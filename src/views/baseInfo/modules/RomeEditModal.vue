<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :footer="null"
    fullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <rome-editor ref="romeEditor" @saveRoomMap="saveRoomMap"></rome-editor>
    <Map :url="configUrl" ref="mapShower" :options="mapOptions" :widgetUrl="widgetUrl" @onload="onMapload"/>


  </j-modal>
</template>

<script>
import Map from '@comp/mars3d/Map.vue'

import IframePageContent from '@comp/layouts/IframeFReportView'
import { httpAction, getAction } from '@api/manage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import TilesetEditor from '@comp/jeecg/TilesetEditor'
import MarsPannel from '@comp/mars-ui/mars-pannel'
import RomeEditor from '@comp/jeecg/RomeEditor'

export default {
  name: 'RomeEditorModal',
  components: {
    RomeEditor,
    MarsPannel,
    TilesetEditor,
    IframePageContent,
    Map
  },
  data() {
    return {
      map: null,
      mapOptions: null,
      modelList: null,
      title: '',
      record: null,
      width: 800,
      visible: false,
      disableSubmit: false,
      inputValue: 0.5,
      checked: true,//地表透明
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      urls: {
        add: "/base/unitMap/add",
        edit: "/base/unitMap/edit",
        queryById: "/base/unitMap/queryById"
      }
    }
  },
  created() {
    this.mapOptions = {
      scene: {
        "sceneMode": 2,
        "showSun": false,
        "showMoon": false,
        "showSkyBox": false,
        "showSkyAtmosphere": false,
        baseLayerPicker:false,
        contextOption:{
          webgl:{
            alpha:true
          }
        },
        "fog": false,
        "fxaa": false,
        center: { lat: 31.83251, lng: 117.221054, alt: 183, heading: 355, pitch: -48 }
      },
      terrain: {
        "url": "{dataServer}/terrain",
        "show": false
      },
      control: {
        'homeButton': true,
        'baseLayerPicker': false,
        'sceneModePicker': true,
        'vrButton': false,
        'fullscreenButton': false,
        'navigationHelpButton': false,
        'animation': false,
        'timeline': false,
        'infoBox': false,
        'geocoder': false,
        'geocoderConfig': { 'key': ['ae29a37307840c7ae4a785ac905927e0'] },
        'selectionIndicator': false,

        'defaultContextMenu': true,
        'mouseDownView': true,
        'compass': { 'bottom': 'toolbar', 'left': '5px' },
        'distanceLegend': { 'left': '100px', 'bottom': '2px' },
        'locationBar': {
          'fps': false,
          'crs': 'CGCS2000_GK_Zone_3',
          'crsDecimal': 0,
          'template': '<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div>视高：{cameraHeight}米</div>'
        }
      },
      basemaps: [
        { "id": 10, "name": "地图底图", "type": "group" },
        {
          "id": 2021,
          "pid": 10,
          "name": "天地图影像",
          "icon": "img/basemaps/tdt_img.png",
          "type": "group",
          "layers": [
            { "name": "底图", "type": "tdt", "layer": "img_d", "key": ["9ae78c51a0a28f06444d541148496e36"] },
            { "name": "注记", "type": "tdt", "layer": "img_z", "key": ["9ae78c51a0a28f06444d541148496e36"] }
          ],

        },
        {
          "pid": 10,
          "name": "天地图电子",
          "icon": "img/basemaps/tdt_vec.png",
          "type": "group",
          "layers": [
            { "name": "底图", "type": "tdt", "layer": "vec_d", "key": ["9ae78c51a0a28f06444d541148496e36"] },
            { "name": "注记", "type": "tdt", "layer": "vec_z", "key": ["9ae78c51a0a28f06444d541148496e36"] }
          ],
          "show": true
        }
    ]

    }
  },
  methods: {
    onMapload(mapins) {
      this.map = mapins

      //this.map.setSceneOptions({"sceneMode":2 });
      this.$refs.romeEditor.mapOnload(this.map)
    },

    drawDevices() {
      mars3d.widget.activate({
        windowOptions: {
          width: 300,
          position: { top: 255, right: 45, bottom: 40 }
        },
        'uri': '/widgets/plot-model/widget.js'
      })
    },
    modelChecked(event) {
      event.target.value.checked = event.target.checked
      event.target.value.tiles3dLayer.show = event.target.checked
    },
    show(record) {
      this.visible = true
      this.record = record
      const that = this;
      setTimeout(() => {
        that.$refs.romeEditor.load(record.unitMap)
      }, 1000)

    },
    showProjectModel() {
      this.$refs.romeEditor.load(record.unitMap)
    },
    showModel(projectModel) {
      projectModel.tiles3dLayer = new mars3d.layer.TilesetLayer(
        JSON.parse(projectModel.position)
      )
      this.map.addLayer(projectModel.tiles3dLayer)
    },
    saveRoomMap(roomMap) {
      const that = this
      that.confirmLoading = true
      this.record.unitMap = JSON.stringify(roomMap) ;
      httpAction(that.urls.edit, this.record, 'put').then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.$emit('ok')
        } else {
          that.$message.warning(res.message)
        }
      }).finally(() => {
        that.confirmLoading = false
      })

    },
    close() {
      this.url = ''
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      this.visible = false
    },
    submitCallback() {
      this.visible = false
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>
<style scoped lang="less">
@import '../../../components/mars-ui/base.less';

.mars-pannel-item-label {
  width: 65px;
  color: white;
}

.ant-slider {
  width: 160px;
}

.f-mb {
  margin-bottom: 10px;
}
</style>
