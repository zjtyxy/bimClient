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

    <Map :url="configUrl" ref="mapShower" :options="mapOptions" :widgetUrl="widgetUrl" @onload="onMapload"/>


  </j-modal>
</template>

<script>
import Map from '@comp/mars3d/Map.vue'

import IframePageContent from '@comp/layouts/IframeFReportView'
import { httpAction, getAction } from '@api/manage'
import HuxingLayer from '@comp/mars3d/HuxingLayer'
import TilesetEditor from '@comp/jeecg/TilesetEditor'
import MarsPannel from '@comp/mars-ui/mars-pannel'
import RomeEditor from '@comp/jeecg/RomeEditor'

export default {
  name: 'RoomShowModal',
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
      url: {
        add: "/base/unitMap/add",
        edit: "/base/unitMap/edit",
        queryById: "/base/unitMap/queryById"
      }
    }
  },
  created() {
    this.mapOptions = {
      scene: {
        scene3DOnly: false,
        center: { lat: 31.83251, lng: 117.221054, alt: 183, heading: 355, pitch: -48 }
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
      }

    }
  },
  methods: {
    onMapload(mapins) {
      this.map = mapins
      // var graphicLayer = new HuxingLayer({
      //   url: '//localhost/plotmodel/huxing/huxing.json',
      //   flyTo:true
      // })
      // this.map.addLayer(graphicLayer)
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
        that.showModel(JSON.parse(record.unitMap))
      }, 1000)

    },
    showModel(projectModel) {
      let roomData ={
        "type": "FeatureCollection",
        "features": []
      }


      for(var i=1;i<31;i++)
      {

        let ceng  = {
          "type": "Feature",
          "geometry": {
            "type": "MultiPolygon",
            "coordinates":[]
          },
          properties : {
            "floorh": i*3+29.2,
            "layerh": 3,
            "CH": i,
            "DYH": "2单元",
            "FH": i+"05号",
            "WZ": "2单元"+i+"层05号房",
            "LDH": "1"
          },
          id:i
        }


        for(var j=0;j<projectModel.features.length;j++)
        {
          let layer = JSON.parse(JSON.stringify(projectModel.features[j]))
          if(layer.geometry.type='Polygon')
          {
            layer.geometry.coordinates[0].push(layer.geometry.coordinates[0][0]);
          }
          ceng.geometry.coordinates.push(layer.geometry.coordinates)
        }
        debugger
        roomData.features.push(ceng)
      }

      var graphicLayer = new HuxingLayer({
        data: roomData,
        flyTo:true
      })
      this.map.addLayer(graphicLayer)
    },
    saveRoomMap(roomMap) {
      const that = this
      that.confirmLoading = true
      this.record.unitMap = JSON.stringify(roomMap) ;

      let httpurl = that.url.edit
      let method = 'put'
      httpAction(httpurl, this.record, method).then((res) => {
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
