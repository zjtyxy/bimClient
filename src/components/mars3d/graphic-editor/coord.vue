<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-if="showAssist" key="1" :showArrow="false" header="批量修改高程（辅助功能）">
      <a-row :gutter="[5, 10]">
        <a-col :span="labelWidth">在原值上增加</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="elevationAdder" :step="1" @change="increase"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">全部修改为</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="elevationValue" :step="1" @change="coverLonlats"></a-input-number>
        </a-col>
      </a-row>
    </a-collapse-panel>
    <a-collapse-panel key="2" :showArrow="false" header="坐标列表">
      <a-row v-for="(item, i) in lonlats" :gutter="[5, 10]" :key="i">
        <a-col class="col-title" :span="24">第 {{ i + 1 }} 点</a-col>
        <a-col :span="labelWidth">经度</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[0]" :step="0.000001"
                          @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">纬度</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[1]" :step="0.000001"
                          @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">高程</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[2]" :step="0.1"
                          @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
/**
 * 模型编辑组件 位置
 */

import _ from 'lodash'

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
      elevationAdder: 0,
      elevationValue: 0,
      activeKey: ['1', '2'],
      originLonlats: [],
    }
  },
  beforeMount() {
    this.originLonlats = props.lonlats
  },
  computed:
    {
      showAssist() {
        return props.lonlats.length > 1 && props.lonlats[1].length >= 3
      }

    },

  methods: {
    pointChange(lonlats) {
      this.$emit('pointChange', lonlats)
    },
    increase() {
      const lonlats = _.cloneDeep(this.originLonlats)
      lonlats.forEach((item) => {
        item[2] += this.elevationAdder
      })
      this.pointChange(lonlats)
    },
    coverLonlats() {
      const lonlats = _.cloneDeep(this.originLonlats)
      lonlats.forEach((item) => {
        item[2] = this.elevationValue.value
      })
      this.pointChange(lonlats)
    }
  },
}

</script>

<style lang="less" scoped></style>
