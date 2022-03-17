<template>
  <mars-pannel :visible="true" right="10px" top="40">

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <a-button class="mars-button" @click="startDrawGraphic">绘制面</a-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据管理:</span>
        <a-button class="mars-button" @click="onClickClear">清除</a-button>
        <a-button class="mars-button" @click="onClickExpFile" title="保存GeoJSON">
          保存
        </a-button>
<!--        <a-upload-->
<!--          :multiple="false"-->
<!--          name="file"-->
<!--          accept="json,geojson"-->
<!--          :file-list="fileList"-->
<!--          :showUploadList="false"-->
<!--          :supportServerRender="true"-->
<!--          :beforeUpload="beforeUploade"-->
<!--          @change="onClickImpFile"-->
<!--        >-->
<!--          <a-button title="打开GeoJSON">-->
<!--            打开-->
<!--          </a-button>-->
<!--        </a-upload>-->
      </a-space>
    </div>
  </mars-pannel>

</template>

<script>


export const eventTarget = new mars3d.BaseClass()
const labelCol = { style: { width: '100px' } }
import MarsPannel from '@comp/mars-ui/mars-pannel'
import MarsSlider from '@comp/mars-ui/mars-slider'

export default {
  name: 'RomeEditor',
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
      inputValue: 0.5,
      checked: true,//地表透明
      tilesEditor: null,
      map: null,
      tiles3dLayer: null,
      modelList: null,
      projectModel: null,
      activeKey: ['1', '2', '3'],
      labelCol: { style: { width: '100px' } },
      inputVal: '',
      selectModel: 0,
      modelOptions: [],
      graphicGroupLayer: null,

    }
  },
  methods: {
    mapOnload(mapInstance) {
      this.map = mapInstance
      this.graphicGroupLayer = new mars3d.layer.GraphicLayer({
        'name': '自定义房间',
        'pid': 0x63,
        'defaultLayer': '默认分组',
        'isRestorePositions': !1,
        'hasEdit': !1
      })
      this.map.addLayer(this.graphicGroupLayer)
      this.bindLayerContextMenu()

    },
    load(JsonStr)
    {
      if(JsonStr)
      {
        this.graphicGroupLayer.loadGeoJSON(JSON.parse(JsonStr), {
          flyTo: true
        })
      }

    },
    startDrawGraphic() {
      // 开始绘制
      this.graphicGroupLayer.startDraw({
        type: 'polygon',
        style: {
          color: '#29cf34',
          opacity: 0.3,
          outline: true,
          outlineWidth: 1,
          height:0,
          outlineColor: '#ffffff',
          label: {
            text: '自定义户型绘制',
            font_size: 18,
            color: '#ffffff',
            distanceDisplayCondition: true,
            distanceDisplayCondition_far: 500000,
            distanceDisplayCondition_near: 0
          }
        }
      })
    },
    endDraw() {
      this.graphicGroupLayer.endDraw()
    },
    bindLayerContextMenu() {
      var that = this
      this.graphicGroupLayer.bindContextMenu([
        {
          text: '开始编辑对象',
          iconCls: 'fa fa-edit',
          show: function (e) {
            const graphic = e.graphic
            if (!graphic || !graphic.startEditing) {
              return false
            }
            return !graphic.isEditing
          },
          callback: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            if (graphic) {
              that.graphicGroupLayer.startEditing(graphic)
            }
          }
        },
        {
          text: '停止编辑对象',
          iconCls: 'fa fa-edit',
          show: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            return graphic.isEditing
          },
          callback: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }
            if (graphic) {
              that.graphicGroupLayer.stopEditing(graphic)
            }
          }
        },
        {
          text: '删除对象',
          iconCls: 'fa fa-trash-o',
          show: (event) => {
            const graphic = event.graphic
            if (!graphic || graphic.isDestroy) {
              return false
            } else {
              return true
            }
          },
          callback: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return
            }
            that.graphicGroupLayer.removeGraphic(graphic)
          }
        },

        {
          text: '计算周长',
          iconCls: 'fa fa-medium',
          callback: function (e) {
            const graphic = e.graphic
            const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
            that.$message.success('该对象的周长为:' + strDis)
          }
        },
        {
          text: '计算面积',
          iconCls: 'fa fa-reorder',
          callback: function (e) {
            const graphic = e.graphic
            const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
            that.$message.success('该对象的面积为:' + strArea)
          }
        }
      ])
    },
    onClickClear() {
      this.graphicGroupLayer.clear()
    },
// 保存geojson
    onClickExpFile() {
      const graphicLayer = this.graphicGroupLayer
      if (graphicLayer.length === 0) {
        this.$message.success('当前没有标注任何数据，无需保存！')
        return
      }
      this.$emit("saveRoomMap",graphicLayer.toGeoJSON());
    //  mars3d.Util.downloadFile('我的标注.json', JSON.stringify(geojson))
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

.mars-pannel-item-label {
  width: 65px;
  color: white;
}
</style>