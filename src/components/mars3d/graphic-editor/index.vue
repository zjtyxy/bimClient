<template>
  <pannel class="attr-editor-model" v-auto-height="50" type="model" title="矢量数据属性" v-model:visible="visible">
    <div class="top-handle-bar">
      <a-space>
        <send fill="#FFF" @click="flyToGraphic" title="飞行定位"/>
        <delete-o fill="#FFF" @click="deleteEntity" title="删除"/>
        <save fill="#FFF" @click="getGeoJson" title="导出geojson"/>
      </a-space>
    </div>
    <div v-if="visible" class="attr-editor-main">
      <attrEditor v-if="activeTab === 'attr'" :labelWidth="labelWidth" :attrs="attrs" @attrChange="attrChange"/>
      <coordEditor v-if="activeTab === 'coord'" :labelWidth="labelWidth" :lonlats="lonlats" @pointChange="pointChange"/>
      <styleEditor v-if="activeTab === 'style'" :labelWidth="labelWidth" :styleConfig="styleConfig" :style="style"
                   @styleChange="styleChange"/>
    </div>
    <a-tabs v-model:activeKey="activeTab" tabPosition="bottom">
      <a-tab-pane key="attr" tab="属性"></a-tab-pane>
      <a-tab-pane key="coord" tab="坐标"></a-tab-pane>
      <a-tab-pane key="style" tab="样式"></a-tab-pane>
    </a-tabs>
  </pannel>
</template>

<script>
/**
 * 模型编辑组件

 */

import _ from 'lodash'
import axios from 'axios'
import Pannel from '@/components/mars3d/marsgis/pannel.vue'
import attrEditor from './attr.vue'
import coordEditor from './coord.vue'
import styleEditor from './style.vue'
import { Delete as DeleteO, Save, Send } from '@icon-park/vue'

const mapWork = window.mars3d

export default {
  props: {
    labelWidth: {
      type: Number,
      default: 8
    },
    lonlats: {
      default: []
    }
  },
  data() {
    return {
      graphicAttr: null,
      labelWidth: 8,
      visible: false,
      activeTab: 'style',
      graphic: null,
      lonlats: [],
      styleConfig: null,
      style: null,
      attrs: null,
    }
  },
  beforeMount() {
    async () => {
      const { data } = await fetchAttrJson()
      this.graphicAttr = data
    }
  },
  provide () {
    return {
      getGraphicAttr: this.graphicAttr,
      getGraphic:this.graphic
    }
  },
  computed:
    {
      showAssist() {
        return props.lonlats.length > 1 && props.lonlats[1].length >= 3
      }

    },

  methods: {
    fetchAttrJson() {
      return axios.get(`${process.env.BASE_URL}config/attr.json`)
    },
    showEditor() {
      visible.value = true
    }, hideEditor() {
      style.value = null
      lonlats.value = []
      attrs.value = null
      visible.value = false
    },
    setValue(gp) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (graphicAttr && gp.isEditing) {
            graphic = gp
            const op = graphic.toJSON()
            style.value = _.cloneDeep(op.style)
            lonlats.value = _.cloneDeep(graphic.coordinates)
            attrs.value = _.cloneDeep(op.attr)

            const config = graphicAttr[op.edittype || op.type] || {}
            styleConfig.value = _.cloneDeep(config)
            resolve(true)
          } else {
            resolve(false)
          }
        }, 100)
      })
    },
    flyToGraphic() {
      graphic.flyTo()
    },
    deleteEntity() {
      graphic.remove()
    },
     getGeoJson() {
  const geojson = graphic.toGeoJSON()
  geojson.properties._layer = graphic._layer.name // 记录分组信息

  mapWork.mars3d.Util.downloadFile('标绘item.json', JSON.stringify(geojson))
},
attrChange(attr) {
  console.log('修改了attr属性', attr) // 方便测试

  graphic.setOptions({
    attr
  })
},
 pointChange(points) {
  console.log('修改了positions坐标', points) // 方便测试
  lonlats.value = points
  graphic.positions = points
},styleChange(style) {
  console.log('修改了style样式', style) // 方便测试

  graphic.setOptions({
    style
  })
}
  },
}



// defineExpose({
//   showEditor,
//   hideEditor,
//   setValue
// })



</script>

<style lang="less" scoped>
.attr-editor-model {
  left: 10px; /*遮盖了toolbar按钮没有关系，按钮使用频次不高 */
  top: 10px;
  width: 260px;

  .top-handle-bar {
    border-bottom: 1px solid #cde1de;
    padding: 5px 0 2px 0;
    font-size: 20px;

    :deep(.i-icon) {
      cursor: pointer;
      line-height: 1;
    }
  }

  .attr-editor-main {
    height: calc(100% - 120px);
    overflow-y: auto;

    :deep(*) {
      font-size: 12px;
    }
  }

  :deep(.attr-editor-label) {
    word-break: break-all;
  }
}
</style>
