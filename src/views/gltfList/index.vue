<template>
  <div>

    <PannelBox class="infoView modelView">
      <a-form>
        <a-form-item>
          <a-space>
            <a-checkbox @change="chkTestTerrain" v-model:checkde="isTestTerrain">深度检测</a-checkbox>
            <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
          </a-space>
        </a-form-item>

        <!--      <div class="infoView-content">-->
        <!--        <a-upload-->
        <!--          :multiple="false"-->
        <!--          name="file"-->
        <!--          accept="json,geojson,kml,kmz"-->
        <!--          :showUploadList="false"-->
        <!--          @change="openGeoJSON"-->
        <!--          :beforeUpload="() => false"-->
        <!--        >-->
        <!--          <icon-folder-upload class="icon" theme="outline" size="20" fill="#ffffff" title="打开"/>-->
        <!--        </a-upload>-->
        <!--        <icon-disk class="icon" theme="outline" size="20" fill="#ffffff" @click="saveGeoJSON" title="保存GeoJSON"/>-->
        <!--      </div>-->

        <a-form-item>
          <a-select ref="select"
            v-model:value="value1"
            style="width: 200px; margin-left: 10px"
            :options="selectOptions"
            @change="handleChange"></a-select>

          <div class="gltfImg" >
            <ul style="padding: 0">
              <li v-for="imgs in dataList" :key="imgs.name">
                <img :src="imgs.image" alt="" @click="showModel(imgs.style)"/>
              </li>
            </ul>
          </div>
        </a-form-item>
      </a-form>

    </PannelBox>
    <!--  <GraphicEditor ref="editor" />-->

    <div id="centerDiv" class="mapcontainer">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>
    </div>
  </div>
</template>

<script>
import PannelBox from '@comp/OperationPannel/PannelBox.vue'
import Map from '@/components/mars3d/Map.vue'

export default {
  name: 'BaseForm',
  components: { PannelBox, Map },
  data() {
    return {
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      FileItem: {
        uid: '',
        name: '',
        status: '',
        response: '',
        url: '',
      },
      FileInfo: {
        file: {},
        fileList: []
      },
      value1: '车辆',
      editor: null,
      isTestTerrain: true,
      isonlyModel: false,
      modelData: {},
      selectOptions: [

      ],
      dataList: [],
      graphicLayer: null,
      eventTarget: new mars3d.BaseClass()

    }
  },
  mounted() {
     var that = this;
    this.eventTarget.on('loadOk', function (event) {
      that.modelData = event.data
      Object.keys(that.modelData).forEach((k, index) => {
        console.log(k,index)
        that.selectOptions.push({
          value: k,
          label: k
        })
      })
     that.handleChange()
    })
  },
  methods: {
    onMapload(map) {
      this.graphicLayer = new mars3d.layer.GraphicLayer({
        hasEdit: true,
        isAutoEditing: true // 绘制完成后是否自动激活编辑
      })
      map.addLayer(this.graphicLayer)
       this.queryModelListData()
      //
      // // 触发自定义事件
      // this.graphicLayer.on(this.mars3d.EventType.drawCreated, function (e) {
      //   const graphic = e.graphic
      //   this.eventTarget.fire('editorUI-draw', { graphic })
      // })
      // this.graphicLayer.on(
      //   [this.mars3d.EventType.editStart, this.mars3d.EventType.editMovePoint, this.mars3d.EventType.editStyle, this.mars3d.EventType.editRemovePoint],
      //   function (e) {
      //     const graphic = e.graphic
      //     this.eventTarget.fire('editorUI-SMR', { graphic })
      //   }
      // )
      // this.graphicLayer.on([this.mars3d.EventType.editStop, this.mars3d.EventType.removeGraphic], function (e) {
      //   this.eventTarget.fire('editorUI-stop')
      // })
    },
// 深度检测
    chkTestTerrain() {
      this.map.scene.globe.depthTestAgainstTerrain = this.isTestTerrain
    },
    onlyPickModelPosition() {
      this.map.onlyPickModelPosition(this.isonlyModel)
    },
// 打开
    openGeoJSON(info) {
      var item = info.file
      var fileName = item.name
      var fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase()
      if (fileType != 'json') {
        alert('文件类型不合法,请选择json格式标注文件！')
      }
      mapWork.openGeoJSON(item)
    },
    queryModelListData() {
      var that = this
      const configUrl = '//data.mars3d.cn/gltf/list.json'
      mars3d.Resource.fetchJson({ url: configUrl })
        .then(function (data) {
          that.eventTarget.fire('loadOk', { data })
        })
        .otherwise(function (error) {
          console.log('加载JSON出错', error)
        })
    },

    saveGeoJSON() {
      if (this.mars3d.graphicLayer.length === 0) {
        // $message('当前没有标注任何数据，无需保存！')
        return
      }
      const geojson = this.mars3d.graphicLayer.toGeoJSON()
      this.mars3d.Util.downloadFile('模型标绘.json', JSON.stringify(geojson))
    },

    //const dataList = ref<any[]>([])

    handleChange() {
      this.dataList = this.modelData[this.value1]
      for (let i = 0; i < this.dataList.length; i++) {
        const item = this.dataList[i]
        item.image = this.mars3d.Util.template(item.image, { gltfServerUrl: '//data.mars3d.cn/gltf' })
        item.style.url = this.mars3d.Util.template(item.style.url, { gltfServerUrl: '//data.mars3d.cn/gltf' })
        this.dataList[i] = item
      }
    },
    drawGltf(style) {
      this.graphicLayer.startDraw({
        type: 'model',
        drawShow: true, // 绘制时，是否显示模型，可避免在3dtiles上拾取坐标存在问题。
        style: style
      })},
    showModel(style) {
      this.drawGltf(style)
    }
  }
}


</script>
<style>
.infoView-content {
  top: 10px;
  width: 210px;
  background-color: rgba(32, 42, 68, 0.5);
}

.icon {
  margin-left: 10px;
}

.modelView {
  right: 10px;
  width: 240px;
}

.gltfImg {
  width: 100%;
  margin-top: 10px;
  /*margin-left: 10px;*/
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
}

.gltfImg li {
  display: inline-block;
  margin-right: 5px;
  width: 99px;
  text-align: center;
  padding-bottom: 10px;
}

.gltfImg img {
  width: 100px;
  height: 90px;
  border: 1.5px solid white;
}
</style>
