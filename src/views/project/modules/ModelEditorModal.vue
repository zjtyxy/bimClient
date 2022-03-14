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
    <Map  :url="configUrl" ref="mapShower" :options="mapOptions" :widgetUrl="widgetUrl" @onload="onMapload"/>
    <tileset-editor ref="tilesetEditor" @saveOptions="saveOptions"></tileset-editor>
  </j-modal>
</template>

<script>
import Map from '@/components/mars3d/Map.vue'

  import IframePageContent from '@comp/layouts/IframeFReportView'
   import { httpAction, getAction } from '@/api/manage'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
import TilesetEditor from '@comp/jeecg/TilesetEditor'
  export default {
    name: 'ModelEditorModal',
    components: {
      TilesetEditor,
      IframePageContent,
      Map
    },
    data () {
      return {
        mapOptions:null,
        modelList:null,
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
    created() {
      this.mapOptions = {
        scene: {
          scene3DOnly:true,
          center: { lat: 31.83251, lng: 117.221054, alt: 183, heading: 355, pitch: -48 }
        },
        control:{
          "homeButton": true,
          "baseLayerPicker": false,
          "sceneModePicker": false,
          "vrButton": false,
          "fullscreenButton": false,
          "navigationHelpButton": false,
          "animation": false,
          "timeline": false,
          "infoBox": false,
          "geocoder": false,
          "geocoderConfig": { "key": ["ae29a37307840c7ae4a785ac905927e0"] },
          "selectionIndicator": false,

          "defaultContextMenu": true,
          "mouseDownView": true,
          "compass": { "bottom": "toolbar", "left": "5px" },
          "distanceLegend": { "left": "100px", "bottom": "2px" },
          "locationBar": {
            "fps": false,
            "crs": "CGCS2000_GK_Zone_3",
            "crsDecimal": 0,
            "template": "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div>视高：{cameraHeight}米</div>"
          }
        }

      }
    },
    methods: {
      onMapload(map) {
        this.$refs.tilesetEditor.mapOnload(map);
      },
      goUrl (params) {
       //this.url= `${window._CONFIG['domianURL']}`+'/bim/bimShow/3dtListShow?'+params+"&token=" + Vue.ls.get('Access-Token');

      },
      show (record) {
        this.visible=true
        this.record =record;
        var that = this;
        var model1={project:record.id}
        getAction("/bim/bimProject/listModelByMainId",model1).then((res)=>{
          if(res.success){
            that.modelList = res.result;
            that.$refs.tilesetEditor.showProjectModel(that.modelList);
             console.log(res)
          }else{

          }
        }).finally(() => {

        })
      },
      saveOptions(projectModel)
      {
        var that = this;
        that.confirmLoading = true;
        // this.projectModel.position = options;
        httpAction('/bim/bimModel/edit',projectModel,'put').then((res)=>{
          if(res.success){
            that.$message.success(res.message);
            that.$emit('ok');
          }else{
            that.$message.warning(res.message);
          }
        }).finally(() => {
          that.confirmLoading = false;
        })
       // mars3d.Util.downloadFile("3dtiles图层配置.json",options)
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
