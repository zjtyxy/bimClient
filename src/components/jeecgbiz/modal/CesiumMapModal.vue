<template>
  <j-modal
    :title="title"
    :width="width"
    fullscreen
    :visible="visible"
    :bodyStyle="bodyStyle"
    @ok="handleOk"
    @cancel="handleCancel"
    style="top:20px">
    <Map :url="configUrl" @onload="onMapload" :widgetUrl="widgetUrl"/>
  </j-modal>
</template>

<script>
import Map from '@/components/mars3d/Map.vue'

export default {
  name: 'PlotMapModal',
  components: {
    Map
  },
  data() {
    const basePathUrl = window.basePathUrl || ''
    return {
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      bodyStyle: {
        padding: '0',
        height: (window.innerHeight - 100) + 'px'
      },
      width: 1024,
      title: '地图标绘',
      footer: null,
      visible: false,
      curRow: null,
      json: '',
      name: '',
      point: null,
      iframeWin: null,

      graphic: null,
      modelData:null,
      map: null
    }
  },
  created() {
  },
  mounted() {

  },
  props: {
    id: {
      type: String,
      default: '',
      required: false
    },
    plotType: {
      type: Number,
      default: 1,
      required: false
    }
  },
  methods: {
    onMapload(map1) {
      this.map = map1
      this.map.on(mars3d.EventType.click, this.onMapClick, this)
      if (this.plotType == 1) {
        if (this.point != null) {
          this.point.format()
          this.updateMarker(this.point)
        }
      } else if (this.plotType == 2) {
        mars3d.widget.activate('/widgets/plot/widget.js')
      } else if (this.plotType == 3) { //模型标绘
        // mars3d.widget.activate({
        //  uri: '/widgets/plot-model/widget.js',
        //   modelData:this.modelData
        // })

      }

    },
    onMapClick(event) {
      if (this.plotType != 1) return
      var cartesian = event.cartesian
      if (cartesian) {
        this.point = mars3d.LatLngPoint.fromCartesian(cartesian)
        this.point.format()
        this.updateMarker(this.point)
      }
    },
    updateMarker(position) {
      if (this.graphic) {
        this.graphic.position = position
      } else {
        this.graphic = new mars3d.graphic.BillboardEntity({
          position: position,
          style: {
            image: '../img/marker/mark1.png',
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
            scale: 0.6,
          },
        })
        this.map.graphicLayer.addGraphic(this.graphic)
      }

      this.map.flyToGraphic(this.graphic, { radius: 2000 })

    },
    handleOk() {
      switch (this.plotType)
      {
        case "1":
          this.$emit('ok', {
              lat: this.point.lat,
              lng: this.point.lng,
              alt: this.point.alt
            }
          )
          break
        case "2":
          break
        case "3":
       //   var widget  = mars3d.widget.getWidget('/widgets/plot-model/widget.js')
          var widget = mars3d.widget.getClass('/widgets/plot-model/widget.js');
            if(widget)
            {
              this.$emit('ok', widget.getGeoJson())

            }
          mars3d.widget.disable('/widgets/plot-model/widget.js')
          break
      }


      this.graphic = null
      this.visible = false
    },
    handleCancel() {
      mars3d.widget.disableAll();
      this.graphic = null
      this.url = ''
      this.visible = false
    },
    show(plotData) {
      this.visible = true
      if (plotData != '') {
        var pp = JSON.parse(plotData)
        if (this.plotType == 1) {
          this.point = new mars3d.LatLngPoint()
          this.point.lng = pp.lng
          this.point.lat = pp.lat
          this.point.alt = pp.alt
        } else {
          //json标绘标绘
          this.modelData =  JSON.parse(plotData)
          setTimeout(() => {
            mars3d.widget.activate({
              windowOptions: {
                "maxmin": false,
                height:200,
                "position": {
                  top:60,
                  "bottom": 70,
                  "right": 60
                }
              },
              uri: '/widgets/plot-model/widget.js',
              modelData:this.modelData
            })
          }, 1000)

        }

      }

    }

  }
}
</script>

<style>

</style>