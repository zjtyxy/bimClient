<template>
  <j-modal
    :title="title"
    :width="width"
    fullscreen
    :visible="visible"
    :bodyStyle="bodyStyle"
    @ok="handleOk"
    :footer="footer"
    @cancel="handleCancel"
    style="top:20px">
      <div id="centerDiv" class="mapcontainer">
        <Map :url="configUrl" @onload="onMapload"/>
      </div>
  </j-modal>
</template>

<script>
import Map from '@/components/mars3d/Map.vue'
    export default {
        name: "PlotMapModal",
      components: {
        Map
      },
        data() {
          const basePathUrl = window.basePathUrl || ''
            return {
                configUrl: basePathUrl + 'config/config.json',
                bodyStyle: {
                    padding: "0",
                    height: (window.innerHeight - 100) + "px"
                },
                width: 1024,
                title:'地图标绘',
                footer: null,
                visible: false,
                curRow:null,
                json:"",
                name: "",
                lon: 0,
                lat: 0,
                iframeWin: null
            }
        },
        created() {
            // window.vueDefinedMyProp = (lon,lat) => {
            //   this.$emit('setLocationValue',lon,lat);
            //   this.handleCancel();
            // }
        },
        mounted() {
            window.addEventListener('message', this.handleMessage);
        },  props: {
            id: {
                type: String,
                default: '',
                required: false
            }
        },
        methods: {
          onMapload(map) {

          },
            handleMessage(event) {
                let data = event.data;
                if (data.type == "save" && data.password==this.id) {
                    this.visible = false
                    this.url="";
                    this.$emit('ok', data.data);
                   // this.handleCancel();
                }
                if (data.type == "point") {
                    this.$emit('setLocationValue', data.data.lon, data.data.lat);
                    this.handleCancel();
                } else if (data.type == "create") {
                    this.postEvent();
                }
            },
            handleOk() {
                if (this.$refs.iframeID != null) {
                    this.$refs.iframeID.contentWindow.postMessage({type:'saveAndClose',password:this.id}, "*");
                }
            },
            handleCancel() {
                this.url="";
                this.visible = false
            }, show(plotData) {
              //  this.curRow = row;
               // this.json = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"线","type":"polyline","edittype":"polyline","style":{},"attr":{"id":"","name":"","remark":""}},"geometry":{"type":"LineString","coordinates":[[113.319702,32.387123,305.8],[112.485492,31.114192,-26.48],[113.17078,30.776341,-499.14],[115.549879,30.642854,-65.34],[115.690113,32.447996,-356.78],[113.708918,32.539686,278.11]]}}]};
                this.json = plotData;
                this.url="http://localhost:8080/jeecg-boot/bim/bimShow/plot.html";
                this.visible = true
            },
            postEvent() {
                 if (this.$refs.iframeID != null) {
                    this.$refs.iframeID.contentWindow.postMessage({
                        type:'plotData',
                        data:this.json
                    }, "*");
                }
            },
        }
    }
</script>

<style>
.mapcontainer {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>