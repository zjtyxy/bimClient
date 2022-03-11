<template>
  <div id="centerDiv" class="mapcontainer">
    <Map :url="configUrl" :widgetUrl="widgetUrl" ref="mapshow" :options="mapOptions" @onload="onMapload"/>

  </div>
</template>

<script>
import JSelectPlot from '@/components/jeecgbiz/JSelectPlot'
import Map from '@/components/mars3d/Map.vue'

import { httpAction, getActionAsync } from '@/api/manage'
import { axios } from '@/utils/request'
import echarts from 'echarts'
import  FloorGraphic from './FloorGraphic'

import MarsPannel from '@comp/mars-ui/mars-pannel'
export default {
  name: 'BimProjectForm',
  components: {
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
      tiles3dLayer: null,
      configUrl: basePathUrl + 'config/config.json',
      widgetUrl: basePathUrl + 'config/widget.json',
      model: {},
      mapOptions: {},
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
    mars3d.widget.disable('/widgets/plot-model/widget.js');
  },
  created() {
    //备份model原始值
    window.isVue = true
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
    this.mapOptions = {
      scene: {
        center: { lat: 31.83251, lng: 117.221054, alt: 183, heading: 355, pitch: -48 }
      }
    }

  },
  mounted() {
    this.initEcharts()
  },
  destroy() {
    mars3d.widget.disable('/widgets/plot-model/widget.js');
  },
  methods: {
    onMapload(map) {
      var that = this
      // mars3d.widget.activate({
      //   'uri': '/widgets/plot-model/widget.js'});
      map.onlyPickModelPosition = true
      var tiles3dLayer = new mars3d.layer.TilesetLayer({
        url: '//data.mars3d.cn/3dtiles/max-fcfh/tileset.json',
        maximumScreenSpaceError: 1,
        'highlight': {
          'type': 'click',
        },
        allowDrillPick:true,
        popupOptions:{title:'户型信息'},
        'show': true,
        showClickFeature: true,
        'luminanceAtZenith': 0.3,
        popup: 'all',
      })
      map.addLayer(tiles3dLayer)
      this.attachTileset(map.viewer,tiles3dLayer.tileset)
      // 单击事件
      tiles3dLayer.on(mars3d.EventType.click, function (event) {
        console.log('单击了3dtiles图层', event)

        // tiles3dLayer.tileset._selectedTiles[0].transform = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(100, 0, 0))
        // Cesium.Matrix4.multiply(temp1.transform, Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(100, 0, 0)), temp1.transform)

        const attr = event.graphic.attr
        if (attr) {
          tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
            color: {
              conditions: [
                ['${name} ===\'' + attr.name + '\'', 'rgb(255, 255, 255)'],
                ['true', 'rgba(255, 255, 235,.03)']
              ]
            }
          })
        }
      })




      const graphicLayer1 = new mars3d.layer.GraphicLayer()
      map.addLayer(graphicLayer1)
      var floorGraphic = new FloorGraphic({
        position: [117.221897, 31.833569, 41.1], // 楼栋位置
        style: {
          url: "//data.mars3d.cn/gltf/mars/floor/floor.glb",
          heading: 100,
          louhao:16,
          unit:3,
          address:"北京市昌平区天通西苑二区",
          topUrl: "//data.mars3d.cn/gltf/mars/floor/top.glb", // 楼顶的模型
          count: 19, // 总层数（不含楼顶）
          spacing: 3 // 每层层高,单位:米
        }
      })
      var floorGraphic1 = new FloorGraphic({
        position: [117.221897, 31.832569, 41.1], // 楼栋位置
        style: {
          url: "//localhost/plotmodel/huxing/office/Unity2GLTF.gltf",
          heading: 100,
          louhao:18,
          unit:3,
          address:"北京市昌平区天通西苑二区",
          topUrl: "//localhost/plotmodel/huxing/office/Unity2GLTF.gltf",
          count: 32, // 总层数（不含楼顶）
          spacing: 3 // 每层层高,单位:米
        }
      })
      graphicLayer1.addGraphic(floorGraphic)
      graphicLayer1.addGraphic(floorGraphic1)
      graphicLayer1.bindPopup(function (event) {
        const attr = event.graphic.attr || {}
        attr["类型"] = event.graphic.type
        attr["来源"] = "我是layer上绑定的Popup"
        attr["备注"] = "我支持鼠标交互"

        return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: '地址：{address}</br>房间：{louhao}号楼{unit}单元{layer}', attr: attr })
      })
      graphicLayer1.on(mars3d.EventType.click, function (event) {
        console.log('单击了3dtiles图层', event)
        const attr = event.graphic.attr
        if (attr) {
          attr.object.showFloor(attr.layer,100);
          // graphicLayer1.style = new Cesium.Cesium3DTileStyle({
          //   color: {
          //     conditions: [
          //       ['${layer} ===\'' + attr.layer + '\'', 'rgb(255, 255, 255)'],
          //       ['true', 'rgba(255, 255, 235,.03)']
          //     ]
          //   }
          // })
        }
      })
      map.on(mars3d.EventType.clickMap, function (event) {
        tiles3dLayer.style = undefined
        floorGraphic.reset();
        floorGraphic1.reset();
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
    showCengByStyle(index) {
      this.$refs.mapshow.showCengByStyle(index)
    },
    showFloorModel(floorGraphic,floorNum) {
      floorGraphic.showFloor(floorNum)
    },
    initEcharts() {
      var echarts = require('echarts')
      // 饼形图
      var di = document.getElementById('ring');
      const myChart = echarts.init(di)
      const option = {
        backgroundColor: 'transparent',
        legend: {
          show: false,
          top: '0%',
          left: 'center',
          icon: 'roundRect',
          itemWidth: 8,
          textStyle: {
            fontSize: this.fontSize(0.68)
          }
        },

        series: [
          {
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderType: 'solid',
              borderColor: '#ffffff'
            },
            emphasis: {
              scale: false,
              scaleSize: 2
            },
            label: {
              show: true,
              position: 'center',
              lineHeight: 28,
              formatter: () => {
                return ''
              },
              emphasis: {
                formatter: (params) => {
                  return '{p|' + params.data.name + '}' + '\n{nm|' + params.data.value + '}'
                }
              },
              rich: {
                p: {
                  width: 130,
                  itemWidth: 100,
                  color: '#fff',
                  fontSize: this.fontSize(1),
                  lineHeight: this.fontSize(1),
                  fontWeight: 'bold'
                  //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据
                },
                nm: {
                  width: 130,
                  itemWidth: 100,
                  color: '#fff',
                  fontSize: this.fontSize(1.5),
                  lineHeight: this.fontSize(1.625),
                  fontWeight: 'bold'
                  //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 64,
                name: '办公建筑',
                itemStyle: {
                  color: 'rgba(14,227,247, 0.58)'
                }
              },
              {
                value: 1,
                name: '综合建筑',
                itemStyle: {
                  color: 'rgba(255,113,94, 0.58)'
                }
              },
              {
                value: 4,
                name: '商场建筑',
                itemStyle: {
                  color: 'rgba(254,  217,  118, 0.64)'
                }
              },
              {
                value: 10,
                name: '宾馆饭店',
                itemStyle: {
                  color: 'rgba(234,94,230, 0.64)'
                }
              },
              {
                value: 1,
                name: '医疗卫生',
                itemStyle: {
                  color: 'rgba(94, 225, 186, 0.58)'
                }
              },
              {
                value: 1,
                name: '文化教育',
                itemStyle: {
                  color: 'rgba(113, 204, 78, 0.58)'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)

      // 柱状图
      const myChart2 = echarts.init(this.$refs.bar, 'dark')
      const option2 = {
        backgroundColor: 'transparent',

        tooltip: {
          trigger: 'axis',
          show: true,
          confine: true,
          textStyle: {
            align: 'left'
          },
          formatter: function (item) {
            let html = `${item[0].name}:${item[0].data}`
            item.slice(1).forEach((s) => {
              if (s.seriesName.indexOf('series') === -1) {
                html += `<br/> ${s.seriesName}:${s.data}`
              }
            })
            return html
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // cross 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          top: '5%',
          left: 'center',
          icon: 'roundRect',
          itemWidth: 8,
          textStyle: {
            fontSize: this.fontSize(0.6875)
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          top: '20%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['办公建筑', '综合建筑', '商场建筑', '宾馆饭店', '医疗卫生', '文化教育'],
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            fontSize: this.fontSize(0.6875),
            interval: 0,
            padding: [10, 0, 0, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            show: false
          },
          show: true
        },

        yAxis: {
          max: 70,
          name: '栋',
          nameTextStyle: {
            // color: "rgba(217, 35, 35, 1)",
            align: 'right',
            verticalAlign: 'middle',
            borderDashOffset: 0,
            padding: [6, 6, 6, 6]
          },
          axisLabel: {
            // color: '#ff0000',
            fontSize: this.fontSize(0.6875),
            interval: 0,
            padding: [0, 0, 0, 0]
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [
          {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            barGap: '-100%',
            showBackground: true,
            itemStyle: {
              color: 'rgba(14,227,247, 1)'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            data: [64, 1, 4, 10, 1, 1],
            z: -8
          },
          {
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.2)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -9,
            showBackground: true,

            data: [70, 70, 70, 70, 70, 70]
          }
        ]
      }
      myChart2.setOption(option2)

      // 折线图
      const myChart3 = echarts.init(this.$refs.line, 'dark')
      const option3 = {
        backgroundColor: 'transparent',

        tooltip: {
          trigger: 'axis',
          show: true,
          confine: true,
          textStyle: {
            align: 'left'
          },
          formatter: function (item) {
            let html = item[0].axisValue * 1 + '月'
            item.slice(0).forEach((s) => {
              if (s.seriesName.indexOf('series') === -1) {
                html += `<br/> ${s.seriesName}:${s.data}%`
              }
            })
            return html
            // return  '{b0}<br/>{a1}: {c1}<br/>{a2}: {c2}'
          },
          // formatter: '{b0}<br/>{a1}: {c1}<br/>{a2}: {c2}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          // data:[""]
          top: '0%',
          left: 'center',
          icon: 'circle',
          type: 'scroll',
          itemHeight: this.fontSize(0.5),
          itemWidth: this.fontSize(0.5),
          textStyle: {
            fontSize: this.fontSize(0.6)
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          top: '18%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            // X轴文字样式
            fontSize: this.fontSize(0.6875),
            interval: 0,
            padding: [10, 0, 0, 0]
          },
          splitLine: {
            show: false
          },
          show: true
        },
        yAxis: {
          // max:100,
          type: 'value',
          name: 'kwh',
          axisLabel: {
            fontSize: this.fontSize(0.6875),
            interval: 0,
            padding: [0, 0, 0, 0]
          },
          nameLocation: 'end',
          nameTextStyle: {
            align: 'right',
            verticalAlign: 'middle',
            borderDashOffset: 0,
            padding: [6, 6, 6, 6]
          },
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [
          {
            name: '办公建筑',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(14,227,247,1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: [4, 3, 5, 4, 0]
          },
          {
            name: '综合建筑',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(255,113,94, 1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: [0.8, 0.6, 1, 0.6, 0]
          },
          {
            name: '商场建筑',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(254,  217,  118, 1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: [0.6, 0.5, 0.8, 0.4, 0]
          },
          {
            name: '宾馆饭店',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(234,94,230, 1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: []
          },
          {
            name: '医疗卫生',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(94, 225, 186, 1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: [1, 1, 1]
          },
          {
            name: '文化教育',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: 'rgba(113, 204, 78, 1)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -8,
            data: [1, 2, 1, 1, 2]
          },
          {
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.2)'
            },
            barGap: '-100%',
            barWidth: 12,
            z: -9,
            showBackground: true,
            data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
          }
        ]
      }
      myChart3.setOption(option3)
    },
    fontSize(res) {
      return res * 16
    },
    async attachTileset(viewer, tileset, count) {
      var dbIdToFeatures = {}
      var hiddenDbIds = []
      var selected = []
      var selectedDbId = -1
      var highlighted = []
      var expro = []
     // var tilesetUrl = tileset.url || tileset.resource.url
     // var lastIndex = tilesetUrl.lastIndexOf('/')
      //var basePath = lastIndex === -1 ? '.' : tilesetUrl.substr(0, lastIndex)
      //
      // for (var i = 0; i < count; i++) {
      //   var sddd = await getActionAsync(basePath + '/info/' + parseInt(i) + '.json', {})
      //   var rst = JSON.parse(sddd)
      //   expro.push(rst.data)
      //
      // }
      tileset.tileLoad.addEventListener(function (tile) {
        processTileFeatures(tile, loadFeature)
      })

      tileset.tileUnload.addEventListener(function (tile) {
        processTileFeatures(tile, unloadFeature)
      })
      function getFeatureDbId(feature) {
        if (Cesium.defined(feature) && Cesium.defined(feature.getProperty)) {
          return parseInt(feature.getProperty('DbId'), 10)
        }
        return -1
      }

      function unloadFeature(feature) {
        const dbId = getFeatureDbId(feature)
        const features = dbIdToFeatures[dbId]
        features.splice(features.findIndex(item => item.feature === feature), 1)

        if (dbId === selectedDbId) {
          selected.splice(selected.findIndex(item => item.feature === feature), 1)
        }

        if (dbId === highlighted) {
          highlighted.splice(highlighted.findIndex(item => item.feature === feature), 1)
        }
      }

      function loadFeature(feature) {
        const dbId = getFeatureDbId(feature)
        let features = dbIdToFeatures[dbId]
        var propsData = feature && feature.getProperty('Props')
        if (propsData) {

        } else {
          feature.setProperty('住户', '泥团家')
          for (var ii = 0; ii < 3; ii++) {
            feature.setProperty('test'+ii, '数字孪生')
          }

        }

        if (!Cesium.defined(features)) {
          dbIdToFeatures[dbId] = features = []

        }
        features.push(feature)

        if (hiddenDbIds.indexOf(dbId) > -1) {
          feature.show = false
        }
      }

      function processContentFeatures(content, callback) {
        const featuresLength = content.featuresLength
        for (let i = 0; i < featuresLength; ++i) {
          const feature = content.getFeature(i)
          callback(feature)
        }
      }

      function processTileFeatures(tile, callback) {
        const content = tile.content
        const innerContents = content.innerContents
        if (Cesium.defined(innerContents)) {
          const length = innerContents.length
          for (let i = 0; i < length; ++i) {
            processContentFeatures(innerContents[i], callback)
          }
        } else {
          processContentFeatures(content, callback)
        }
      }



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
.chart {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 100%;
  font-size: 15px;
  border: none;
  color: #ffffff;
  background: none;
}
.achart_container {
  position: absolute;
  padding: 10px;
  top: 0;
  right: 45px;
  width: 29rem;
  height: 100%;
  background: linear-gradient(to right, rgba(84, 97, 117, 0.5), rgba(42, 52, 69, 1));
}

._item_top {
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.22rem;
}

.item_bottom {
  margin-bottom: -2rem;
}

._item_title {
  position: relative;
  height: 1.56rem;
  padding-left: 1.25rem;
  line-height: 1.56rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
}

._item_title::before {
  content: "";
  width: 0.5rem;
  height: 1rem;
  background: rgba(229, 237, 255, 1);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

._item_title::after {
  content: "";
  width: 26.5rem;
  height: 0.63rem;
  background: url("/img/icon/分割.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: calc(100% + 0.13rem);
}

._item_row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
}

._item_row_title {
  font-size: 0.88rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.25rem;
  letter-spacing: 2px;
  text-shadow: 0px 0px 0px #02e1ff;
}

.row1 {
  width: 10rem;
  align-items: center;
  display: flex;
  margin-bottom: 1.19rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.row1_right {
  margin-left: 0.75rem;
  text-align: left;
}

.ml {
  margin-left: 50px;
}

.right_title {
  font-size: 2rem;
  font-weight: bold;
  color: #febc04;
  line-height: 2rem;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.right_sub_title {
  font-size: 0.88rem;
  color: #d8d8d8;
  line-height: 1;
  white-space: nowrap;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

._item_full_box {
  width: 100%;
  height: 14rem;
  margin-top: 35px;
}

._item_full_box_width {
  width: 100%;
}

.row3 {
  flex: 1;
  position: relative;
}

._item_row_box3 {
  width: 12rem;
  height: 12rem;
}

._item_row_box2 {
  width: 10rem;
  margin-right: 40px;
  margin-top: 20px;
  transform: translateX(-1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.box2_item,
.box2_item1,
.box2_item2,
.box2_item3,
.box2_item4,
.box2_item5 {
  position: relative;
  width: 100%;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.box2_item::before,
.box2_item1::before,
.box2_item2::before,
.box2_item3::before,
.box2_item4::before,
.box2_item5::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border: 0.06rem solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
}

.box2_item::before {
  background: rgba(14, 227, 247, 0.58);
}

.box2_item1::before {
  background: rgba(255, 113, 94, 0.58);
}

.box2_item2::before {
  background: rgba(254, 217, 118, 0.64);
}

.box2_item3::before {
  background: rgba(234, 94, 230, 0.64);
}

.box2_item4::before {
  background: rgba(94, 225, 186, 0.58);
}

.box2_item5::before {
  background: rgba(113, 204, 78, 0.58);
}

.box2_item::after,
.box2_item1::after,
.box2_item2::after,
.box2_item3::after,
.box2_item4::after,
.box2_item5::after {
  content: attr(count);
  font-size: 1rem;
  font-weight: 600;
  color: #87c1fa;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}

.box2_item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}

.ring1 {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: hidden;
}

#ring {
  width: 100%;
  height: 100%;
}

.bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.bar_chart {
  width: 100%;
  height: 100%;
}

#bar {
  width: 100%;
  height: 100%;
}

.container-last-chart {
  margin-top: 8px;
}
</style>