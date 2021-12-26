<template>
  <div class="components-input-demo-presuffix">
    <!---->
    <a-input @click="openModal" placeholder="请点击打开地图标绘" v-model="departNames" readOnly :disabled="disabled">
      <a-icon slot="prefix" type="cluster" title="地图标绘控件"/>
      <a-icon v-if="departIds" slot="suffix" type="close-circle" @click="handleEmpty" title="清空"/>
    </a-input>

    <plot-map-modal
      ref="innerDepartSelectModal"
      :modal-width="modalWidth"
      :id="id"
      :plotType="plotType"
      :rootOpened="rootOpened"
      :depart-id="departNames"
      @ok="handleOK"
      @initComp="initComp"/>
  </div>
</template>

<script>
import JSelectDepartModal from './modal/JSelectDepartModal'
import PlotMapModal from './modal/CesiumMapModal'

export default {
  name: 'JSelectPlot',
  components: {
    PlotMapModal,
    JSelectDepartModal
  },
  props: {
    modalWidth: {
      type: Number,
      default: 500,
      required: false
    },
    plotType: {
      type: Number,
      default: 1,
      required: false
    },
    id: {
      type: String,
      default: '',
      required: false
    },
    rootOpened: {
      type: Boolean,
      default: true,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // 自定义返回字段，默认返回 id
    customReturnField: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      departNames: '',
      departIds: ''
    }
  },
  mounted() {
    this.departNames = this.value
  },
  watch: {
    value(val) {
      this.departNames = val
      this.departIds = val
    }
  },
  methods: {
    initComp(departNames) {
      this.departNames = departNames
      this.departIds = departNames
    },
    openModal() {
      this.$refs.innerDepartSelectModal.show(this.departNames)
    },
    handleOK(idstr) {
      let value = JSON.stringify(idstr)
      debugger
      if (this.departNames != '') {
        this.departNames = JSON.stringify(idstr)
        this.departIds = this.departNames
      } else {
        this.departNames = ''
        this.departIds = ''
      }
      this.$emit('change', value)
      this.$emit('input', value)
    },
    getDepartNames() {
      return this.departNames
    },
    handleEmpty() {
      this.handleOK('')
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style scoped>
.components-input-demo-presuffix .anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}

.components-input-demo-presuffix .anticon-close-circle:hover {
  color: #f5222d;
}

.components-input-demo-presuffix .anticon-close-circle:active {
  color: #666;
}
</style>