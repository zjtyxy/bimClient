<template>
  <a-collapse :activeKey="['1']">
    <a-collapse-panel key="1" :showArrow="false" header="属性信息">
      <a-row :gutter="[5, 10]">
        <div v-for="(item, index) in attrComps" :key="index">
          <a-col :span="labelWidth">{{ item.label }}</a-col>
          <a-col :span="24 - labelWidth">
            <component :is="getComponent(item.type)" size="small" v-model:value="attributies[item.name]"
                       @change="unionChange(item)">
              <template v-if="item.type === 'label'">{{ attributies[item.name] }}</template>
            </component>
          </a-col>
        </div>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
/**
 * 模型编辑组件 属性
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */

import { Input, InputNumber } from 'ant-design-vue'
import Radio from './comps/radio.vue'
import { isBoolean, isNumber } from 'lodash'

export default {
  props: {
    labelWidth: {
      type: Number
    }
  },
  data(){
    return{
      attrComps:[],
      attributies:[],
      attrs:[],
      immediate:true
    }
  },
  components:
    {
      Radio,
      InputNumber,
    },
  watch(){
    props(props)
    {
      this.attributies.value = props.attrs
      if (props.attrs) {
        const ac= Object.keys(props.attrs)
          .filter((k) => !['id', 'name', 'remark'].includes(k))
          .map((k) => {
            let type = 'text'
            if (isBoolean(attributies[k])) {
              type = 'radio'
            }
            if (isNumber(attributies[k])) {
              type = 'number'
            }
            return { name: k, label: k, type }
          })
        this.attrComps.value = [
          { name: 'id', label: '主键', type: 'label', defval: '' },
          { name: 'name', label: '名称', type: 'text', defval: '' },
          { name: 'remark', label: '备注', type: 'textarea', defval: '' }
        ].concat(ac)
      }
    }

  },
  methods: {
    unionChange(value) {
      this.$emit('attrChange', { [item.name]: attributies.value[item.name]})
      this.$emit('change', value)
    },
    getComponent(type) {
      return components[type]
    }
  }
}
</script>

<style lang="less" scoped></style>
