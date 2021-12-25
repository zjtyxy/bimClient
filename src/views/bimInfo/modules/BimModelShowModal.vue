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
    <Map height="100%" :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>

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
        // this.loadTileset(map, '地铁通道', 'http://127.0.0.1/BIM/totle/tileset.json', JSON.stringify({
        //   lng: 118.699194,
        //   lat: 31.978852,
        //   alt: 0.6
        // }), 558)
      },
      goUrl (params) {
       //this.url= `${window._CONFIG['domianURL']}`+'/bim/bimShow/3dtListShow?'+params+"&token=" + Vue.ls.get('Access-Token');

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