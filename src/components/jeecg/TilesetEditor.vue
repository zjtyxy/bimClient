<template>
  <mars-pannel :visible="true" right="10" top="50" bottom="160">
    <div class="infoView-content">
      <a-form :label-col="labelCol">
        <a-collapse :activeKey="activeKey">
          <a-collapse-panel key="1" header="模型URL地址">
            <div class="f-mb">

              <a-form-item label="模型URL地址">
<!--                <a-input v-model:value="formState.txtModel" style="width: 100%"></a-input>-->
               <a-select style="width: 180px" v-model:value="selectModel" @change="formModelChange" :options="modelOptions"></a-select>
              </a-form-item>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">状态:</span>
                <a-checkbox @change="isChecked" v-model:checked="checked">开启地下模式</a-checkbox>
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">地表透明度:</span>
                <a-slider @change="opacityChange" style="width: 230px;" v-model:value="inputValue" :min="0" :max="1" :step="0.1" />
              </a-space>
            </div>
          </a-collapse-panel>

          <a-collapse-panel key="2" header="位置方向">
            <a-form-item label="经度">
              <a-input-number class="mars-input-number" v-model:value="formState.txtX" :step="0.000001"
                              @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="纬度">
              <a-input-number class="mars-input-number" v-model:value="formState.txtY" :step="0.000001"
                              @change="formStateChange"/>
            </a-form-item>

            <a-form-item label="高度">
              <a-row :gutter="10">
                <a-col :span="15">
                  <a-input-number class="mars-input-number" v-model:value="formState.txtZ" :step="0.1"
                                  @change="formStateChange"/>
                </a-col>
                <a-col :span="9">
                  <a-checkbox v-model:checked="formState.depthTestAgainstTerrain" @change="formStateChange">深度检测
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item label="方向X">
              <a-input-number class="mars-input-number" v-model:value="formState.rotationX" :step="0.1"
                              @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="方向Y">
              <a-input-number class="mars-input-number" v-model:value="formState.rotationY" :step="0.1"
                              @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="方向Z(四周)">
              <a-input-number class="mars-input-number" v-model:value="formState.rotationZ" :step="0.1"
                              @change="formStateChange"/>
            </a-form-item>

            <a-form-item label="变换垂直轴">
              <a-select style="width: 180px" v-model:value="formState.axis" @change="formStateChange" :options="axisOptions"></a-select>
            </a-form-item>
            <a-form-item label="鼠标拖拽编辑">
              <a-switch v-model:checked="formState.tilesEditorEnabled" @change="formStateChange"/>
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="其他参数">
            <a-form-item label="缩放比例">
              <a-input-number class="mars-input-number" v-model:value="formState.scale" :step="0.1"
                              @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="显示精度">
              <a-slider style="width: 280px;" :min="1" :max="30" v-model:value="formState.maximumScreenSpaceError"
                        @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="材质底色">
              <a-slider style="width: 280px;" :min="0.1" :max="3" :step="0.1"
                        v-model:value="formState.luminanceAtZenith" @change="formStateChange"/>
            </a-form-item>
            <a-form-item label="透明度">
              <a-slider style="width: 280px;" :min="0.1" :max="1" :step="0.1" v-model:value="formState.opacity"
                        @change="formStateChange"/>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>

        <div class="f-tac">
          <a-space>
            <a-button class="mars-button" @click="locate">视角定位至模型</a-button>
            <a-button class="mars-button" @click="showCompTree">查看构件</a-button>
            <a-button class="mars-button" @click="saveBookmark">保存参数</a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </mars-pannel>

</template>

<script>

import TilesEditor from './TilesEditor.js'

export const eventTarget = new mars3d.BaseClass()
const labelCol = { style: { width: '100px' } }
import MarsPannel from '@comp/mars-ui/mars-pannel'
import MarsSlider from '@comp/mars-ui/mars-slider'

export default {
  name: 'TilesetEditor',
  components: { MarsSlider, MarsPannel },
  props: {
    value: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    trim: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {},
  mounted() {

    // setTimeout(() => {
    //   mapWork.showModel(this.formState.txtModel)
    // }, 1000)
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      inputValue:0.5,
      checked:true,//地表透明
      tilesEditor: null,
      map: null,
      tiles3dLayer: null,
      modelList: null,
      projectModel: null,
      activeKey: ['1', '2', '3'],
      labelCol: { style: { width: '100px' } },
      inputVal: '',
      selectModel:0,
      modelOptions: [
      ],
      axisOptions: [
        { value: '', label: '默认' },
        { value: 'Z_UP_TO_X_UP', label: 'Z轴 -> X轴' },
        { value: 'Z_UP_TO_Y_UP', label: 'Z轴 -->Y轴' },
        { value: 'X_UP_TO_Y_UP', label: 'X轴 -->Y轴' },
        { value: 'X_UP_TO_Z_UP', label: 'X轴 -->Z轴' },
        { value: 'Y_UP_TO_X_UP', label: 'Y轴 -->X轴' },
        { value: 'Y_UP_TO_Z_UP', label: 'Y轴 -->Z轴' }
      ],
      formState: {
        position: null,
        txtModel: '//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json',
        chkProxy: false,
        txtX: 0,
        txtY: 0,
        txtZ: 0,
        depthTestAgainstTerrain: false,
        rotationZ: 0.0,
        rotationX: 0.0,
        rotationY: 0.0,
        scale: 1,
        axis: '',
        tilesEditorEnabled: false,
        maximumScreenSpaceError: 8,
        luminanceAtZenith: 0.1,
        opacity: 1
      },
      underground:null
    }
  },
  methods: {
    mapOnload(mapInstance) {
      this.map = mapInstance
      this.tilesEditor = new TilesEditor({
        map: this.map,
        moveImg: '/img/icon/move.png',
        rotateImg: '/img/icon/rotate.png'
      })
      var that = this
      this.tilesEditor.on('change', function (data) {
        that.tilesEditor.enabled = true
        that.editor(data, that.formState.txtZ)
        //  eventTarget.fire("tilesEditor", { data })
      })
      this.underground = new mars3d.thing.Underground({
        alpha: 0.5
      })
      this.map.addThing(this.underground)
      //this.showModel();
    },
    opacityChange()
    {
      this.underground.alpha = this.inputValue
    },
    isChecked()
    {
      this.underground.enabled = this.checked
    },
    showCompTree() {

    },
    saveBookmark(params) {
      if (this.formState.axis === '') {
        delete this.formState.axis
      }
      this.projectModel.position = JSON.stringify(this.getConfig(this.formState))
      this.$emit('saveOptions', this.projectModel)
      // mars3d.Util.downloadFile("3dtiles图层配置.json", JSON.stringify(this.formState))
    },
    locate() {
      if (this.tiles3dLayer.tileset.boundingSphere) {
        this.map.camera.flyToBoundingSphere(this.tiles3dLayer.tileset.boundingSphere, {
          offset: new Cesium.HeadingPitchRange(this.map.camera.heading, this.map.camera.pitch, this.tiles3dLayer.tileset.boundingSphere.radius * 2)
        })
      } else {
        this.map.flyToPoint(this.tiles3dLayer.position, {
          radius: this.tiles3dLayer.tileset.boundingSphere.radius * 2
        })
      }
    },
    editor(event, txtZ) {
      if (Cesium.defined(event.position)) {
        const pos = event.position
        const thisZ = txtZ
        const position = mars3d.PointUtil.setPositionsHeight(pos, thisZ)

        this.tilesEditor.position = position
        this.tiles3dLayer.center = position

        const point = mars3d.LngLatPoint.fromCartesian(position)
        //eventTarget.fire("changePoition", { point })
      } else if (Cesium.defined(event.heading)) {
        this.tiles3dLayer.rotation_z = event.heading
        // eventTarget.fire("changeHeading", { tiles3dLayer })
      }
    },
    showProjectModel(modelList) {
      this.modelList = modelList

      if (this.modelList && this.modelList.length > 0) {
        this.modelOptions =[]
        for(let i=0; i<this.modelList.length;i++)
        {
          this.modelOptions.push( { value: i, label:this.modelList[i].name  },)
        }

        this.projectModel = this.modelList[0]
      }
      if (this.projectModel.position) {
        this.toConfig(JSON.parse(this.projectModel.position))
      }
        this.formState.txtModel = this.projectModel.url
      this.showModel()
    },

    showModel() {
      var url = this.formState.txtModel
      this.removeLayer()
      if (!url) {
        alert('请输入图层URL！')
        return
      }

      this.tiles3dLayer = new mars3d.layer.TilesetLayer(
        this.getConfig(this.formState)
      )
      this.map.addLayer(this.tiles3dLayer)
      var that = this
      // 加载完成事件
      this.tiles3dLayer.on(mars3d.EventType.load, function (event) {
        const data = event.tileset
        if (that.tiles3dLayer.transform) {
          that.tilesEditor.range = data.boundingSphere.radius * 0.9
          that.tilesEditor.heading = that.tiles3dLayer.rotation_z
          that.tilesEditor.position = that.tiles3dLayer.position

        } else {
          that.tilesEditor.enabled = false
        }
        that.toConfig(event.target.center,that.tiles3dLayer)
      })
    },
    toConfig(locParams,tiles3dLayer) {

      var that = this
      if (locParams.position.alt < -1000 || locParams.position.alt > 10000) {
        locParams.position.alt = 0 // 高度异常数据，自动赋值高度为0
      }
      that.formState.txtX = locParams.position.lng.toFixed(6)
      that.formState.txtY = locParams.position.lat.toFixed(6)
      that.formState.txtZ = locParams.position.alt.toFixed(6)
      that.formState.luminanceAtZenith = locParams.luminanceAtZenith
      that.formState.maximumScreenSpaceError = locParams.maximumScreenSpaceError

      that.formState.rotationX = locParams.rotation.x.toFixed(1)
      that.formState.rotationY = locParams.rotation.y.toFixed(1)
      that.formState.rotationZ = locParams.rotation.z.toFixed(1)
      that.formState.scale = locParams.scale || 1
      if(!tiles3dLayer) tiles3dLayer={}
      that.formState.axis = locParams.axis || tiles3dLayer.axis ||''
      // } else {
      //   //  mapWork.getDefined(formState)
      // }
    },
    removeLayer() {
      if (this.tiles3dLayer) {
        this.map.basemap = 2021 // 切换到默认卫星底图
        this.map.removeLayer(this.tiles3dLayer, true)
        this.tiles3dLayer = null
      }
    },
    formModelChange()
    {
      this.projectModel = this.modelList[this.selectModel]
      if (this.projectModel.position) {
        this.toConfig(JSON.parse(this.projectModel.position))
      }
      this.formState.txtModel = this.projectModel.url
      this.showModel()
    },
    formStateChange() {
      //mapWork.updateModel(this.formState)
      const pannelData = this.formState
      const params = this.getConfig(this.formState)

      this.tiles3dLayer.tileset.maximumScreenSpaceError = pannelData.maximumScreenSpaceError
      this.tiles3dLayer.tileset.luminanceAtZenith = pannelData.luminanceAtZenith
      this.tiles3dLayer.opacity = pannelData.opacity
      this.tiles3dLayer.setOptions(params)

      if (this.tiles3dLayer.transform) {
        this.tilesEditor.heading = this.tiles3dLayer.rotation_z
        this.tilesEditor.position = this.tiles3dLayer.position
      }

      // 深度检测
      this.map.scene.globe.depthTestAgainstTerrain = pannelData.depthTestAgainstTerrain
      // 鼠标拖拽编辑
      this.tilesEditor.enabled = pannelData.tilesEditorEnabled
    },
    getConfig(pannelData) {
      let url, maximumScreenSpaceError
      let tf = false
      if (pannelData) {
        url = pannelData.txtModel
        maximumScreenSpaceError = mars3d.Util.formatNum(pannelData.maximumScreenSpaceError, 1)
      } else {
        url = '//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json'
        maximumScreenSpaceError = 8
        tf = true
      }

      const params = {
        name: '模型名称',
        type: '3dtiles',
        url: url,
        maximumScreenSpaceError: maximumScreenSpaceError, // 【重要】数值加大，能让最终成像变模糊
        maximumMemoryUsage: 1024, // 【重要】内存分配变小有利于倾斜摄影数据回收，提升性能体验
        // center: map.getCameraView(),
        show: true
      }
      if (tf) {
        return params
      }

      const x = mars3d.Util.formatNum(pannelData.txtX, 6)
      if (x) {
        params.position = params.position || {}
        params.position.lng = x
      }

      const y = mars3d.Util.formatNum(pannelData.txtY, 6)
      if (y) {
        params.position = params.position || {}
        params.position.lat = y
      }

      const z = mars3d.Util.formatNum(pannelData.txtZ, 6)
      if (z) {
        params.position = params.position || {}
        params.position.alt = z
      }

      const rotation_x = mars3d.Util.formatNum(pannelData.rotationX, 1)
      if (rotation_x) {
        params.rotation = params.rotation || {}
        params.rotation.x = rotation_x
      }

      const rotation_y = mars3d.Util.formatNum(pannelData.rotationY, 1)
      if (rotation_y) {
        params.rotation = params.rotation || {}
        params.rotation.y = rotation_y
      }

      const rotation_z = mars3d.Util.formatNum(pannelData.rotationZ, 1)
      if (rotation_z) {
        params.rotation = params.rotation || {}
        params.rotation.z = rotation_z
      }

      const luminanceAtZenith = mars3d.Util.formatNum(pannelData.luminanceAtZenith, 1)
      params.luminanceAtZenith = luminanceAtZenith


      const scale = mars3d.Util.formatNum(pannelData.scale || 1, 1)
      if (scale > 0) {
        params.scale = scale
      }

      const axis = pannelData.axis
      params.axis = axis

      const isProxy = pannelData.chkProxy
      if (isProxy) {
        params.proxy = '//server.mars3d.cn/proxy/'
      }

      params.rotation = params.rotation || {}
      params.rotation.x = params.rotation.x || 0
      params.rotation.y = params.rotation.y || 0
      params.rotation.z = params.rotation.z || 0

      params.popup='all'
      params.flyTo= true
      params.highlight={
          type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
          outlineEffect: true, // 采用OutlineEffect方式来高亮
          color: '#00FF00'
        }

      return params
    }
  }
}
</script>

<style scoped lang="less">
@import '../../components/mars-ui/base.less';

/deep/ .ant-space {
  display: inline-flex;
}

/deep/ .ant-select-dropdown {
  background-color: @form-input-background !important;

  /deep/ .ant-select-item {
    transition: none;

    &:hover,
    &:focus {
      background-color: @mars-background-active;
    }
  }

  /deep/ .ant-select-item-option-active {
    background-color: @mars-background-active !important;
  }
}

/deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: transparent !important;
}

/deep/ .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: @mars-background-active !important;
}

/deep/ .ant-select-selector {
  border-color: @border-color-ordinary !important;
  background: none;
  background-color: transparent !important;
}

.mars-select {
  color: @mars-basecolor;
  background-color: @form-input-background !important;
  background: none;

  * {
    color: @mars-basecolor;
  }

}

/deep/ .ant-form-item {
  box-sizing: border-box;
  margin: 0 0 24px;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  vertical-align: top;
}

/deep/ .ant-row {
  display: flex;
  flex-flow: row wrap;
}


.mars-input-number {
  color: #ffffffd9;
  background-color: rgba(63, 72, 84, 0.7);
  border-color: grey;

  * {
    color: #ffffffd9;
  }
}

.infoView {
  max-height: 770px !important;
  bottom: 60px;
  overflow: scroll;
}

.infoView-content {
  max-height: 737px !important;
  width: 345px;
}

.mars-button {
  font-size: 14px;
  background: #20a0ff33;
  border-color: #20a0ff;
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;

  /deep/ .i-icon {
    font-size: 18px !important;
    line-height: 18px;
    vertical-align: middle !important;
    padding-left: 2px;
    padding-right: 2px;
  }
}


.f-tac {
  text-align: center;
}

.f-mb {
  margin-bottom: 10px;
}
</style>