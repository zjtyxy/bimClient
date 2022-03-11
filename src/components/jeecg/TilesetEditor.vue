<template>
  <mars-pannel :visible="true" right="10" top="10" bottom="160">
    <div class="infoView-content">
      <a-form :label-col="labelCol">
        <a-collapse :activeKey="activeKey">
          <a-collapse-panel key="1"  header="模型URL地址">
            <div class="f-mb">
              <span>模型URL地址: </span> &nbsp;&nbsp;
              <a-input v-model:value="formState.txtModel" style="width: 100%"></a-input>
            </div>

            <div class="f-mb">
              <a-button class="mars-button" @click="showModel">加载模型</a-button> &nbsp;&nbsp;
              <a-checkbox v-model:checked="formState.chkProxy">使用代理</a-checkbox>
            </div>
          </a-collapse-panel>

          <a-collapse-panel key="2" header="位置方向">
            <a-form-item label="经度">
              <a-input-number class="mars-input-number" v-model:value="formState.txtX" :step="0.000001" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="纬度">
              <a-input-number class="mars-input-number"  v-model:value="formState.txtY" :step="0.000001" @change="formStateChange" />
            </a-form-item>

            <a-form-item label="高度">
              <a-row :gutter="10">
                <a-col :span="15">
                  <a-input-number class="mars-input-number"  v-model:value="formState.txtZ" :step="0.1" @change="formStateChange" />
                </a-col>
                <a-col :span="9">
                  <a-checkbox class="mars-input-number"  v-model:checked="formState.depthTestAgainstTerrain" @change="formStateChange">深度检测</a-checkbox>
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item label="方向X">
              <a-input-number class="mars-input-number"  v-model:value="formState.rotationX" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="方向Y">
              <a-input-number class="mars-input-number"  v-model:value="formState.rotationY" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="方向Z(四周)">
              <a-input-number class="mars-input-number"  v-model:value="formState.rotationZ" :step="0.1" @change="formStateChange" />
            </a-form-item>

            <a-form-item label="变换垂直轴">
              <a-select v-model:value="formState.axis" @change="formStateChange" :options="axisOptions"></a-select>
            </a-form-item>
            <a-form-item label="鼠标拖拽编辑">
              <a-switch v-model:checked="formState.tilesEditorEnabled" @change="formStateChange" />
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="其他参数">
            <a-form-item label="缩放比例">
              <a-input-number class="mars-input-number" v-model:value="formState.scale" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="显示精度">
              <a-slider style="width: 280px;" :min="1" :max="30" v-model:value="formState.maximumScreenSpaceError" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="材质底色">
              <a-slider style="width: 280px;"   :min="0.1" :max="3" :step="0.1" v-model:value="formState.luminanceAtZenith" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="透明度">
              <a-slider style="width: 280px;"  :min="0.1" :max="1" :step="0.1" v-model:value="formState.opacity" @change="formStateChange" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>

        <div class="f-tac">
          <a-space>
            <a-button class="mars-button" @click="locate">视角定位至模型</a-button>
<!--            <a-button class="mars-button" @click="showCompTree">查看构件</a-button>-->
<!--            <a-button class="mars-button" @click="saveBookmark">保存参数</a-button>-->
          </a-space>
        </div>
      </a-form>
    </div>
  </mars-pannel>

</template>

<script>




const labelCol = { style: { width: "100px" } }
  import MarsPannel from '@comp/mars-ui/mars-pannel'
  export default {
    name: 'TilesetEditor',
    components: { MarsPannel },
    props:{
      value:{
        type:String,
        required:false
      },
      placeholder:{
        type:String,
        required:false,
        default:''
      },
      trim:{
        type: Boolean,
        required: false,
        default:false
      }
    },
    watch:{
      // value:{
      //   immediate:true,
      //   handler:function(){
      //     this.initVal();
      //   }
      // },
      // // update-begin author:sunjianlei date:20200225 for:当 type 变化的时候重新计算值 ------
      // type() {
      //   this.backValue({ target: { value: this.inputVal } })
      // },
      // update-end author:sunjianlei date:20200225 for:当 type 变化的时候重新计算值 ------
    },
    mounted() {
      // setTimeout(() => {
      //   mapWork.showModel(this.formState.txtModel)
      // }, 1000)
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data(){
      return {
        map:null,
        tiles3dLayer:null,
         activeKey : ["1", "2", "3"],
        labelCol : { style: { width: "100px" } },
        inputVal:'',
        axisOptions : [
          { value: "", label: "默认" },
          { value: "Z_UP_TO_X_UP", label: "Z轴 -> X轴" },
          { value: "Z_UP_TO_Y_UP", label: "Z轴 -->Y轴" },
          { value: "X_UP_TO_Y_UP", label: "X轴 -->Y轴" },
          { value: "X_UP_TO_Z_UP", label: "X轴 -->Z轴" },
          { value: "Y_UP_TO_X_UP", label: "Y轴 -->X轴" },
          { value: "Y_UP_TO_Z_UP", label: "Y轴 -->Z轴" }
        ],
        formState:{
          txtModel: "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
          chkProxy: false,
          txtX: 0,
          txtY: 0,
          txtZ: 0,
          depthTestAgainstTerrain: false,
          rotationZ: 0.0,
          rotationX: 0.0,
          rotationY: 0.0,
          scale: 1,
          axis: "",
          tilesEditorEnabled: false,
          maximumScreenSpaceError: 8,
          luminanceAtZenith: 0.1,
          opacity: 1
        }
      }
    },
    methods:{
      mapOnload(mapInstance)
      {
        this.map = mapInstance;
        this.showModel(this.formState.txtModel);
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
      showModel(url) {
        this.removeLayer()
        if (!url) {
          alert("请输入图层URL！")
          return
        }

        this.tiles3dLayer = new mars3d.layer.TilesetLayer({
          url: url,
          // 高亮时的样式
          highlight: {
            type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
            outlineEffect: true, // 采用OutlineEffect方式来高亮
            color: "#00FF00"
          },
          popup: "all",
          flyTo: true
        })
        this.map.addLayer(this.tiles3dLayer)
         var that = this;
        // 加载完成事件
        this.tiles3dLayer.on(mars3d.EventType.load, function (event) {
       //   const data = event.tileset

        //   if (tiles3dLayer.transform) {
        //     tilesEditor.range = data.boundingSphere.radius * 0.9
        //     tilesEditor.heading = tiles3dLayer.rotation_z
        //     tilesEditor.position = tiles3dLayer.position
        //   } else {
        //     tilesEditor.enabled = false
        //   }
        //
        //   // 触发自定义事件，更改面板中的值
        //   eventTarget.fire("tiles3dLayerLoad", { data, tiles3dLayer })
          const tileset = event.tileset
          const tiles3dLayer = event.target

          // 取模型中心点信息
          const locParams = tiles3dLayer.center
         debugger
          if (locParams.alt < -1000 || locParams.alt > 10000) {
            locParams.alt = 0 // 高度异常数据，自动赋值高度为0
          }

          that.formState.txtX = locParams.lng.toFixed(6)
          that.formState.txtY = locParams.lat.toFixed(6)
          that.formState.txtZ = locParams.alt.toFixed(6);
          that.formState.luminanceAtZenith = tileset.luminanceAtZenith
          that.formState.maximumScreenSpaceError = tileset.maximumScreenSpaceError

          if (tiles3dLayer.transform) {
            that.formState.rotationX = tiles3dLayer.rotation_x.toFixed(1)
            that.formState.rotationY = tiles3dLayer.rotation_y.toFixed(1)
            that.formState.rotationZ = tiles3dLayer.rotation_z.toFixed(1)
            that.formState.scale = tiles3dLayer.scale || 1
            that.formState.axis = tiles3dLayer.axis
          } else {
          //  mapWork.getDefined(formState)
          }
         })
      },
      removeLayer() {
        if (this.tiles3dLayer) {
          this.map.basemap = 2021 // 切换到默认卫星底图
          this.map.removeLayer(tiles3dLayer, true)
          this.tiles3dLayer = null
        }
      },
      formStateChange(){
        //mapWork.updateModel(this.formState)
        const pannelData = this.formState;
        const params = this.getConfig(this.formState)

        params.rotation = params.rotation || {}
        params.rotation.x = params.rotation.x || 0
        params.rotation.y = params.rotation.y || 0
        params.rotation.z = params.rotation.z || 0

        // if (this.tiles3dLayer.transform) {
        //   this.tilesEditor.heading = this.tiles3dLayer.rotation_z
        //   this.tilesEditor.position = this.tiles3dLayer.position
        // }
        this.tiles3dLayer.tileset.maximumScreenSpaceError = pannelData.maximumScreenSpaceError
        this.tiles3dLayer.tileset.luminanceAtZenith = pannelData.luminanceAtZenith
        this.tiles3dLayer.opacity = pannelData.opacity
        this.tiles3dLayer.setOptions(params)
        // 深度检测
        this.map.scene.globe.depthTestAgainstTerrain = pannelData.depthTestAgainstTerrain
        // 鼠标拖拽编辑
        //tilesEditor.enabled = pannelData.tilesEditorEnabled
      },
      getConfig(pannelData) {
        let url, maximumScreenSpaceError
        let tf = false
        if (pannelData) {
          url = pannelData.txtModel
          maximumScreenSpaceError = mars3d.Util.formatNum(pannelData.maximumScreenSpaceError, 1)
        } else {
          url = "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json"
          maximumScreenSpaceError = 8
          tf = true
        }

        const params = {
          name: "模型名称",
          type: "3dtiles",
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
        if (luminanceAtZenith !== 0.2) {
          params.luminanceAtZenith = luminanceAtZenith
        }

        const scale = mars3d.Util.formatNum(pannelData.scale || 1, 1)
        if (scale > 0) {
          params.scale = scale
        }

        const axis = pannelData.axis
        params.axis = axis

        const isProxy = pannelData.chkProxy
        if (isProxy) {
          params.proxy = "//server.mars3d.cn/proxy/"
        }

        return params
      }
    }
  }
</script>

<style scoped>
.ant-space {
  display: grid;
}
.ant-form-item {
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
.ant-row {
  display: flex;
  flex-flow: row wrap;
}
.mars-main-view
{
  position: relative;
  padding: 12px 16px;
  color: #ffffff;
  line-height: 1.5715;
  cursor: pointer;
  transition: all .3s,visibility 0s;
  background:  #20a0ff33!important;
  border: none;
}

.mars-input-number {
  color: #ffffffd9;
  background-color:rgba(63, 72, 84, 0.7);
  border-color: grey;
* {
  color:#ffffffd9;
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

.ant-input {
  width: 240px;
}
.mars-button {
  font-size: 14px;
  background:  #20a0ff33;
  border-color: #20a0ff;
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
:deep(.i-icon) {
  font-size: 18px !important;
  line-height: 18px;
  vertical-align: middle !important;
  padding-left: 2px;
  padding-right: 2px;
}
}

.ant-slider-mark-text {
  color: #ffffffd9;
}
/*滑动条 未选择、已选择部分 高度*/
.ant-slider-rail {
  height: 10px;
  border-radius: 5px;
  background-color: #9fd9fd;
}
.ant-slider-track {
  height: 10px;
  border-radius: 5px;
  background-color: #4db3ff;
}
/*滑动条 刻度点*/
.ant-slider-dot {
  border-color: #ececec;
  background-color: #16212c7d;
  top: -1px;
  height: 12px;
  width: 12px;
}
.ant-slider-dot:first-child {
  margin-left: -1px;
}
.ant-slider-dot:last-child {
  right: -1px;
  left: auto !important;
}

/*滑动条 拖拽点*/
.ant-slider-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  margin-top: -4px;
}
.ant-slider-dot-active, .ant-slider-handle {
  border-color: #4db3ff;
}
.f-tac {
  text-align: center;
}
.f-mb {
  margin-bottom: 10px;
}
</style>