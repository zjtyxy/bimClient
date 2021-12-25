<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <bim-model-attrs-list ref="realFormAttrs"></bim-model-attrs-list>
  </j-modal>
</template>

<script>

import BimModelForm from './BimModelForm'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import BimModelAttrsList from '@views/bimInfo/BimModelAttrsList'
export default {
  name: 'BimModelAttrsListModal',
  components: {
    BimModelAttrsList,
    BimModelForm
  },
  data () {
    return {
      title:'',
      width:1200,
      visible: false,
      disableSubmit: false
    }
  },
  methods: {

    add () {
      this.visible=true
      this.$nextTick(()=>{
        this.$refs.realFormAttrs.add();
      })
    },
    showAttrs(record) {
      this.visible=true
      this.$nextTick(()=>{
        this.$refs.realFormAttrs.show(record);
      })
    },
    close () {
      this.$emit('close');
      this.visible = false;
    },
    handleOk () {
      this.close()
    },
    submitCallback(){
      this.$emit('ok');
      this.visible = false;
    },
    handleCancel () {
      this.close()
    }
  }
}
</script>