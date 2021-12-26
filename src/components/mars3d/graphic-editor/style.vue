<template>
  <a-collapse v-model:activeKey="styleCollapse">
    <a-collapse-panel key="1" :showArrow="false" header="+ 样式信息">
      <a-row :gutter="[5, 10]" align="middle">
        <a-col :span="labelWidth">所在图层</a-col>
        <a-col :span="24 - labelWidth">{{ layerName }}</a-col>
        <a-col :span="labelWidth">标号类型</a-col>
        <a-col :span="24 - labelWidth">{{ entityName }}</a-col>
        <div v-for="(item, i) in props.styleConfig.style" :key="i">
          <template v-if="styleValue && showIt(item)">
            <a-col :span="labelWidth">{{ item.label }}</a-col>
            <a-col :span="24 - labelWidth">
              <component
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionChange(item)"
              >
                <span v-if="item.type === 'label'" class="attr-editor-label">{{ styleValue[item.name] }}</span>
              </component>
            </a-col>
          </template>
        </div>
      </a-row>
    </a-collapse-panel>
    <a-collapse-panel v-if="styleValue && styleValue.label" key="2" :showArrow="false" header="+ 注记信息">
      <a-row :gutter="[5, 10]">
        <div v-for="(item, i) in labelConfig.style" :key="i">
          <template v-if="labelShowIt(item)">
            <a-col :span="labelWidth">{{ item.label }}</a-col>
            <a-col :span="24 - labelWidth">
              <component
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue.label[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionLabelChange"
              ></component>
            </a-col>
          </template>
        </div>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
/**
 * 模型编辑组件 样式
 */
import _ from 'lodash'
import { Input, InputNumber, Select, Slider } from 'ant-design-vue'
import Radio from './comps/radio.vue'
// import { ColorPicker } from "vue-color-kit"
export default {
  props: {
    labelWidth: Number,
    styleConfig: {},
    style: {}
  },

  data() {
    return {
      getGraphicAttr: inject('getGraphicAttr'),
      getGraphic: inject('getGraphic'),
      layerName: '',
      entityName: '',
      styleValue: null,
      showImpacts: [],
      showLabelImpacts: [],
      labelConfig: getLabelConfig(),
      styleCollapse: ['1', '2'],
      immediate: true
    }
  },

  watch:{
   //  props(props)
   //  {
   //    if (props.style) {
   //      this.styleValue = _.cloneDeep(props.style)
   //      this.setDefault()
   //      const gp = this.getGraphic()
   //      this.layerName = gp?._layer?.name || ''
   //      this.entityName = gp?._name || props.styleConfig.name
   //      setImpacts()
   //      if (props.style.label) {
   //        this.setLabelDefault()
   //        this.setLabelImpacts()
   //      }
   //    }
   // //   this.getLabelConfig()
   //  }
  },
  components: {
    //ColorPicker
    // number: InputNumber,
    // radio: Radio,
    // slider: Slider,
    // color: ColorPicker,
    // combobox: Select,
    // textarea: Input.TextArea,
    // label: "span"
  },
  methods: {

    getComponent(type) {
      return components[type]
    }, getLabelConfig() {
      const graphicAttr = this.getGraphicAttr()

      return graphicAttr.label
    }, setDefault() {
      if (props.styleConfig.style) {
        props.styleConfig.style.forEach((item) => {
          if (!styleValue.value[item.name] && styleValue.value[item.name] !== 0 && styleValue.value[item.name] !== false) {
            styleValue.value[item.name] = item.defval
          }
        })
      }
    }, setImpacts() {
      let allImpacts = []
      if (props.styleConfig.style) {
        props.styleConfig.style.forEach((item) => {
          if (item.impact && styleValue.value[item.name] === true) {
            allImpacts = allImpacts.concat(item.impact)
          }
          if (item.data && _.isArray(item.data)) {
            item.data.forEach((op) => {
              if (op.impact && styleValue.value[item.name] === op.value) {
                allImpacts = allImpacts.concat(op.impact)
              }
            })
          }
        })
      }
      showImpacts.value = _.uniq(allImpacts)
    }, setLabelDefault() {
      labelConfig.style.forEach((item) => {
        if (!styleValue.value.label[item.name] && styleValue.value.label[item.name] !== 0) {
          styleValue.value.label[item.name] = item.defval
        }
      })
    }, setLabelImpacts() {
      let allImpacts = []

      labelConfig.style.forEach((item) => {
        if (item.impact && styleValue.value.label[item.name] === true) {
          allImpacts = allImpacts.concat(item.impact)
        }
        if (item.data && _.isArray(item.data)) {
          item.data.forEach((op) => {
            if (op.impact && styleValue.value.label[item.name] === op.value) {
              allImpacts = allImpacts.concat(op.impact)
            }
          })
        }
      })
      showLabelImpacts.value = _.uniq(allImpacts)
    }, updateStyle(item) {
      this.$emit('styleChange', {
        [item.name]: styleValue.value[item.name]
      })
    }, unionChange(item) {
      if (item.name === 'fill' || item.name === 'outline') {
        if (styleValue.value.fill === false && styleValue.value.outline === false) {
          window.$message('填充和边框不能同时为否')
          styleValue.value[item.name] = true
          return
        }
      }
      setImpacts()
      updateStyle(item)
    }, unionLabelChange(item) {
      setLabelDefault()
      setLabelImpacts()
      updateStyle({ name: 'label' })
    }, showIt(item) {
      return item.type !== 'hidden' && (!item.isImpact || (item.isImpact && showImpacts.value.includes(item.name)))
    },
    labelShowIt(item) {
      return item.type !== 'hidden' && (!item.isImpact || (item.isImpact && showLabelImpacts.value.includes(item.name)))
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.ant-select) {
  width: 100%;
}
</style>
