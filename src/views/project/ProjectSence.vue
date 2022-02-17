<template>
  <div id="centerDiv" class="mapcontainer">
    <div class="infoview" style="top: 30%; width: 100px; text-align: center">
      <a-button @click="showCengByStyle()" type="button" id="btnShowAll" class="btn btn-primary active">整体</a-button>
      <a-button @click="showCengByStyle(15)" type="button" id="btnShowF5" class="btn btn-primary">15层</a-button>
      <a-button @click="showCengByStyle(11)" type="button" id="btnShowF4" class="btn btn-primary" >10层</a-button>
      <a-button @click="showCengByStyle(9)" type="button" id="btnShowF3" class="btn btn-primary">7层</a-button>
      <a-button @click="showCengByStyle(6)" type="button" id="btnShowF2" class="btn btn-primary">5层</a-button>
      <a-button @click="showCengByStyle(4)" type="button" id="btnShowF1" class="btn btn-primary">3层</a-button>
      <a-button @click="showCengByStyle(1)" type="button" id="btnShowD1" class="btn btn-primary">1层</a-button>
    </div>
    <Map :url="configUrl" :widgetUrl="widgetUrl" ref="mapshow" @onload="onMapload"/>
  </div>
</template>

<script>
import JSelectPlot from '@/components/jeecgbiz/JSelectPlot'
import Map from '@/components/mars3d/Map.vue'
import { httpAction, getActionAsync } from '@/api/manage'
import { axios } from '@/utils/request'

export default {
  name: 'BimProjectForm',
  components: {
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
        add: '/bim/device/addByPlot',
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
      var that = this
      this.$refs.mapshow.loadTileset(map, '地铁通道', 'http://127.0.0.1/BIM/totle/tileset.json', JSON.stringify({
        lng: 118.699194,
        lat: 31.978852,
        alt: 0.6
      }), 558)

      mars3d.widget.on('saveGeoJson', function (event) {
        if (event) {
          that.saveGeoJson(event.features, event.layer)
        }

      })
    },
    saveGeoJson(json, layer) {
      console.log(json, layer)
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
</style>