<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    fullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <iframe :src="url" frameborder="0" width="100%" height="800px" scrolling="auto" style="background-color: #fff;"></iframe>

  </j-modal>
</template>

<script>

  import BimModelForm from './BimModelForm'
  import IframePageContent from '@comp/layouts/IframeFReportView'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  export default {
    name: 'BimModelShowModal',
    components: {
      IframePageContent,
      BimModelForm
    },
    data () {
      return {
        title:'',
        width:800,
        visible: false,
        disableSubmit: false,
        url:""
      }
    },
    methods: {
      goUrl (params) {
       this.url= `${window._CONFIG['domianURL']}`+'/bim/bimShow/3dtListShow?'+params+"&token=" + Vue.ls.get('Access-Token');

      },
      show (record) {
        this.visible=true
        this.goUrl ('id='+record.id);
      },
      listShow (ids) {
        this.visible=true
        this.goUrl ('ids='+ids);
      },
      close () {
        this.url ="";
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.visible = false;
      },
      submitCallback(){
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>