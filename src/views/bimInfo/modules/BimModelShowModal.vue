<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :footer="null"
    fullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <Map  :url="configUrl" ref="mapShower" :widgetUrl="widgetUrl" @onload="onMapload"/>

  </j-modal>
</template>

<script>
import Map from '@/components/mars3d/Map.vue'
  import BimModelForm from './BimModelForm'
  import IframePageContent from '@comp/layouts/IframeFReportView'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  export default {
    name: 'BimModelShowModal',
    components: {
      IframePageContent,
      BimModelForm,Map
    },
    data () {
      return {
        title:'',
        record:null,
        width:800,
        visible: false,
        disableSubmit: false,
        url:"",
        configUrl: basePathUrl + 'config/config.json',
        widgetUrl: basePathUrl + 'config/widget.json',
      }
    },
    methods: {
      onMapload(map) {
        this.$refs.mapShower.loadTileset(map, '地铁通道', this.record.url, this.record.position, this.record.infoCount)
      },
      goUrl (params) {
       //this.url= `${window._CONFIG['domianURL']}`+'/bim/bimShow/3dtListShow?'+params+"&token=" + Vue.ls.get('Access-Token');

      },
      show (record) {
        this.visible=true
        this.record =record;
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
<style>
/*#centerDiv {*/
/*  height: 737px;*/
/*  width: 100%;*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  left: 0;*/
/*  top: 0;*/
/*  border: none;*/
/*  overflow: hidden;*/
/*  position: relative;*/
/*}*/

</style>
