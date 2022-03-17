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
    <mars-pannel :visible="true" right="10" top="50" >
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">状态:</span>
          <a-checkbox @change="isChecked" v-model:checked="checked">开启地下模式</a-checkbox>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">地表透明度:</span>
          <a-slider @change="opacityChange" style="width: 230px;" v-model:value="inputValue" :min="0" :max="1"
                    :step="0.1"/>
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">模型列表</span>
          <div v-for="(item,index) in modelList">
          <a-checkbox  @change="modelChecked" :value="item" v-model:checked="item.checked">  {{item.name}}</a-checkbox>
          </div>
        </a-space>
      </div>
      <div class="f-tac">
        <a-space>
          <a-button class="mars-button" @click="drawDevices">设备标绘</a-button>
        </a-space>
      </div>
    </mars-pannel>
    <Map :url="configUrl" ref="mapShower" :options="mapOptions" :widgetUrl="widgetUrl" @onload="onMapload"/>


  </j-modal>
</template>

<script>
import Map from '@/components/mars3d/Map.vue'

import IframePageContent from '@comp/layouts/IframeFReportView'
import { httpAction, getAction } from '@/api/manage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import TilesetEditor from '@comp/jeecg/TilesetEditor'
import MarsPannel from '@comp/mars-ui/mars-pannel'

export default {
  name: 'ModelShowModal',
  components: {
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
      inputValue:0.5,
      checked:true,//地表透明
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
    }
  },
  created() {
    this.mapOptions = {
      scene: {
        scene3DOnly: true,
        center: { lat: 31.83251, lng: 117.221054, alt: 183, heading: 355, pitch: -48 }
      },
      control: {
        'homeButton': true,
        'baseLayerPicker': false,
        'sceneModePicker': false,
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
      this.underground = new mars3d.thing.Underground({
        alpha: 0.5
      })
      this.map.addThing(this.underground)
    },
    opacityChange()
    {
      this.underground.alpha = this.inputValue
    },
    isChecked()
    {
      this.underground.enabled = this.checked
    },
    drawDevices(){
      mars3d.widget.activate({windowOptions:{
          width:300,
          position:{top:255,right:45,bottom:40}
        },
        'uri': '/widgets/plot-model/widget.js'});
    },
    modelChecked(event)
    {
      event.target.value.checked = event.target.checked
      event.target.value.tiles3dLayer.show =   event.target.checked
    },
    show(record) {
      this.visible = true
      this.record = record
      var that = this
      var model1 = { project: record.id }
      getAction('/bim/bimProject/listModelByMainId', model1).then((res) => {
        if (res.success) {
          for (let i = 0; i < res.result.length; i++) {
             res.result[i].checked = true
          }
          that.modelList = res.result
          setTimeout(() => {
            that.showProjectModel(that.modelList)
          }, 1000)

        } else {

        }
      }).finally(() => {

      })
    },
    showProjectModel() {
      if (this.modelList && this.modelList.length > 0) {
        for (let i = 0; i < this.modelList.length; i++) {
          this.showModel(this.modelList[i])
        }
      }
    },
    showModel(projectModel) {

      projectModel.tiles3dLayer = new mars3d.layer.TilesetLayer(
        JSON.parse(projectModel.position)
      )
      this.map.addLayer(projectModel.tiles3dLayer)
    },
    listShow(ids) {
      this.visible = true
      this.goUrl('ids=' + ids)
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
