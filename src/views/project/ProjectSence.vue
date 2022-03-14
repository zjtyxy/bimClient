<template>
  <div id="centerDiv" class="mapcontainer">
   <tileset-editor ref="tilesetEditor" @saveOptions="saveOptions"></tileset-editor>
    <Map :url="configUrl" :widgetUrl="widgetUrl" ref="mapshow" @onload="onMapload"/>
  </div>
</template>

<script>
import JSelectPlot from '@/components/jeecgbiz/JSelectPlot'
import Map from '@/components/mars3d/Map.vue'
import { httpAction, getActionAsync } from '@/api/manage'
import { axios } from '@/utils/request'
import MarsPannel from '@comp/mars-ui/mars-pannel'
import TilesetEditor from '@comp/jeecg/TilesetEditor'


export default {
  name: 'BimProjectForm',
  components: {
    TilesetEditor,
    MarsPannel,
    JSelectPlot, Map
  },
  props: {
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    const basePathUrl = window.basePathUrl || ''
    return {
      tiles3dLayer:null,
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {},
      url: {
        add: '/device/device/addByPlot',
        edit: '/bim/bimProject/edit',
        queryById: '/bim/bimProject/queryById'
      }
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    },
  },
  beforeDestroy() {

  },
  created() {
    //备份model原始值
    window.isVue = true
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
  },
  methods: {
    onMapload(map) {
      this.$refs.tilesetEditor.mapOnload(map);
      var that = this
      // this.$refs.mapshow.loadTileset(map, '地铁通道', 'http://127.0.0.1/BIM/totle/tileset.json', JSON.stringify({
      //   lng: 118.699194,
      //   lat: 31.978852,
      //   alt: 0.6
      // }), 558)
      //
      // mars3d.widget.on('saveGeoJson', function (event) {
      //   if (event) {
      //     that.saveGeoJson(event.features, event.layer)
      //   }
      //
      // })
    },
    saveOptions(options)
    {
      mars3d.Util.downloadFile("3dtiles图层配置.json",options)
    },

    saveGeoJson(json, layer) {
      var that = this;
      httpAction(this.url.add, json, 'post').then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.$emit('ok')
        } else {
          that.$message.warning(res.message)
        }
      }).finally(() => {
        that.confirmLoading = false
      })
    },
    edit(record) {
      this.model = Object.assign({}, record)
      this.visible = true
    },
    showCengByStyle(index)
    {
      this.$refs.mapshow.showCengByStyle(index);
    }

  }
}
</script>

<style>
.mapcontainer {
  position: relative;
  height: 766px;
  overflow: hidden;
}
.ant-space {
   display: grid;
 }

</style>