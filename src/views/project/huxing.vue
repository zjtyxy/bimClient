<template>
  <div id="centerDiv" class="mapcontainer">

    <Map :url="configUrl" :widgetUrl="widgetUrl" ref="mapshow" :options="mapOptions" @onload="onMapload"/>
    <div class="chart">
      <div class="chartOne">
        <h6>分类统计</h6>
        <ul class="chartList">
          <li :key="item" v-for="item in fltjData">
            <div class="title">{{ item.name }}</div>
            <div class="conter">
            <span>{{ item.xms }}</span
            >个， 投资<span>{{ item.zds }}</span
            >亿，占地<span>{{ item.zjl }}</span
            >亩
            </div>
          </li>
        </ul>
      </div>
      <div class="chartTwo" id="chartTwo">
        <h6>分资金来源统计</h6>
        <div id="ul_ZJLY" class="chartTwo_ulzjly"></div>
      </div>

      <div class="chartThree" id="chartThree">
        <h6>分年度统计</h6>
        <button @click="btnNDTJ_xms(chartsData.ndtj)">项目数</button>
        <button @click="btnNDTJ_zds(chartsData.ndtj)">占地数</button>
        <button @click="btnNDTJ_zjl(chartsData.ndtj)">资金量</button>
        <div id="ul_NDTJ" class="chartThree_ulndtj"></div>
      </div>
    </div>
  </div>
</template>

<script>
import JSelectPlot from '@/components/jeecgbiz/JSelectPlot'
import Map from '@/components/mars3d/Map.vue'
import { httpAction, getActionAsync } from '@/api/manage'
import { axios } from '@/utils/request'
import HuxingLayer from '@comp/mars3d/HuxingLayer'
import echarts from 'echarts'
export default {
  name: 'BimProjectForm',
  components: {
    JSelectPlot, Map, HuxingLayer
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
      fltjData: [
        { name: '公共文化', xms: 160, zds: 10, zjl: 645 },
        { name: '公共教育', xms: 848, zds: 580, zjl: 10 },
        { name: '医疗卫生', xms: 370, zds: 10, zjl: 150560 },
        { name: '公共体育', xms: 91, zds: 0, zjl: 182 },
        { name: '社会保障', xms: 233, zds: 10, zjl: 808 },
        { name: '基层公共服务', xms: 20, zds: 10, zjl: 10 }
      ],
      chartsData: {
        zjly: [
          { name: '省级', value: 88 },
          { name: '市级', value: 127 },
          { name: '区县级', value: 175 },
          { name: '街道级', value: 270 },
          { name: '社会资本', value: 42 }
        ],
        ndtj: {
          xms: [
            { name: '2013', value: 1 },
            { name: '2014', value: 2 },
            { name: '2015', value: 6 },
            { name: '2016', value: 36 },
            { name: '2017', value: 85 },
            { name: '2018', value: 10 },
            { name: '2019年', value: 17 }
          ],
          zds: [
            { name: '2013', value: 10 },
            { name: '2014', value: 20 },
            { name: '2015', value: 30 },
            { name: '2016', value: 40 },
            { name: '2017', value: 50 },
            { name: '2018', value: 60 }
          ],
          zjl: [
            { name: '2013', value: 55600 },
            { name: '2014', value: 95600 },
            { name: '2015', value: 162896 },
            { name: '2016', value: 195761 },
            { name: '2017', value: 87068 },
            { name: '2018', value: 68393 }
          ]
        }
      }
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    },
  },
  mounted() {
    var ZJLY = document.getElementById('ul_ZJLY')

    this.initCharts_Two(this.chartsData.zjly, ZJLY)
    // 分年度统计
    this.initCharts_Three(this.chartsData.ndtj)
  },
  beforeDestroy() {

  },
  created() {
    //备份model原始值
    window.isVue = true
    this.modelDefault = JSON.parse(JSON.stringify(this.model))
    this.mapOptions = {
      scene: {
        center: { lat: 31.820474, lng: 117.178655, alt: 326, heading: 24, pitch: -45 }
      }
    }
  },
  methods: {
    onMapload(map) {
      var that = this
      var graphicLayer = new HuxingLayer({
        url: '//localhost/plotmodel/huxing/huxing.json'
      })
      map.addLayer(graphicLayer)
      // var graphicLayer = new mars3d.layer.GraphicLayer()
      // map.addLayer(graphicLayer)
      // this.addDemoGraphic1(graphicLayer);
      // 可以绑定Popup弹窗，回调方法中任意处理
      // layer.bindPopup(function (event) {
      //   let item = event.graphic.attr;
      //   if (!item) {
      //     return false;
      //   }
      //   return mars3d.Util.getTemplateHtml({
      //     title: "楼栋",
      //     attr: item,
      //     template: [
      //       { field: "CH", name: "层号" },
      //       { field: "DYH", name: "单元" },
      //       { field: "FH", name: "房号" },
      //       { field: "WZ", name: "位置" },
      //     ],
      //   });
      // });
    },
    addDemoGraphic1(graphicLayer) {
      const graphic = new mars3d.graphic.PolylineVolumeEntity({
        positions: [
          [117.220337, 31.832987, 45.6],
          [117.220337, 31.832987, 1142.8],
          // [117.220242, 31.835234, 45.6],
          // [117.216263, 31.835251, 39.3],
          // [117.217219, 31.819929, 35.8],
          // [117.223096, 31.818342, 29.8],
          // [117.249686, 31.818964, 40.1],
          // [117.263171, 31.816664, 35.2],
          // [117.278695, 31.816107, 35.5],
          // [117.279826, 31.804185, 34.5],
          // [117.286308, 31.804112, 29.2],
          // [117.28621, 31.801059, 24.6]
        ],
        style: {
          shape: 'pipeline',
          radius: 80,
          color: '#3388ff',
          opacity: 1
        },
        attr: { remark: '示例1' }
      })
      graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

      //initGraphicManager(graphic)
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
    initCharts_Two(arr, ZJLY) {
      var echarts = require('echarts')
      const data = []
      for (let i = 0; i < arr.length; i++) {
        const object= {}
        object.name = arr[i].name
        object.value = arr[i].value
        data[i] = object
      }

      const myChart = echarts.init(ZJLY)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}'
        },
        // 图例 的相关设置
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            color: '#ccc'
          }
        },
        // 图形的设置
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: '80%',
            right: '20%',
            // 图形上文本标签的样式设置
            label: {
              show: false
            },
            color: [
              '#37A2DA',
              '#32C5E9',
              '#67E0E3',
              '#9FE6B8',
              '#FFDB5C',
              '#ff9f7f',
              '#fb7293',
              '#E062AE',
              '#E690D1',
              '#e7bcf3',
              '#9d96f5',
              '#8378EA',
              '#96BFFF'
            ],
            center: ['45%', '55%'],
            data: data, // 使用for循环添加
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)

      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

// chartThree   Echart柱状   年度统计
    initCharts_Three(arr) {
      this.histogram(arr.xms, '个')
    },
// 分年度统计，按钮事件
    btnNDTJ_xms(arr) {
      this.histogram(arr.xms, '个')
    },
    btnNDTJ_zds(arr) {
      this.histogram(arr.zds, '亩')
    },
    btnNDTJ_zjl(arr) {
      this.histogram(arr.zjl, '亿')
    },

// 项目、占地、资金    按钮点击切换
    histogram(arr, Word) {
      var echarts = require('echarts')
      const arrName = []
      const arrValue = []
      for (let i = 0; i < arr.length; i++) {
        arrName[i] = arr[i].name
        arrValue[i] = arr[i].value
      }
      var NDTJ = document.getElementById('ul_NDTJ')
      const myChart = echarts.init(NDTJ)
      const option = {
        // xAxis和yAxis的nameTextStyle不起作用
        // 因此设置了字体的全局样式
        textStyle: {
          color: '#ccc'
        },
        title: {
          text: '单位:' + Word,
          // 全局样式对此不生效，
          textStyle: {
            color: '#ccc'
          }
        },
        // 移入柱子时的阴影
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{c}' + Word,
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '5px',
          right: '0',
          bottom: '5px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: arrName
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            // 柱子的相关设置
            itemStyle: {
              color: 'rgb(0, 174, 255)'
            },
            barWidth: '20px',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: arrValue
          }
        ]
      }
      myChart.setOption(option)

      window.addEventListener('resize', function () {
        myChart.resize()
      })
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

.divPanel {
  position: absolute;
  bottom: 40px;
  left: 55px;
}

.divPanel img {
  width: 40px;
  height: 180px;
}

.infoView {
  left: 10px;
  width: 100px;
}

/* m10右侧统计图表1 */
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

.chartOne,
.chartTwo,
.chartThree {
  width: 393px;
  height: 30%;
  margin-bottom: 6px;
  position: relative;
  border: 1px solid #17366c;
  background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
  linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
  linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
  linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

h6 {
  color: #ffffff;
}

}
.chart h6 {
  padding: 4px;
  width: 10px;
  margin-left: 5%;
  float: left;
  margin-top: 3%;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
}

.chartOne h6::before {
  position: absolute;
  top: 10px;
  left: 6%;
  width: 20px;
  height: 2px;
  background: red;
  content: " ";
}

.chartTwo h6::before {
  position: absolute;
  top: 10px;
  left: 6%;
  width: 20px;
  height: 2px;
  background: red;
  content: " ";
}

.chartThree h6::before {
  position: absolute;
  top: 10px;
  left: 6%;
  width: 20px;
  height: 2px;
  background: red;
  content: " ";
}

.chartOne .chartList {
  height: 30%;
  width: 91%;
  float: left;
  margin-top: 15px;
  font-size: 15px;
}

.chartOne .title {
  float: left;
}

.chartOne .conter {
  float: right;
}

.chartOne .title {
  margin-right: 10px;
}

.chartOne .chartList li {
  height: 40px;
  width: 95%;
  margin-left: 23px;
  border-bottom: white 0.5px dashed;
  line-height: 50%;
  padding: 13px;
}

.chartOne .chartList li:hover {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}

.chartOne .chartList span {
  color: rgb(0, 174, 255);
}

/*chartTwo ul_ZJLY */
.chartTwo_ulzjly,
.chartThree_ulndtj {
  width: 84%;
  height: 90%;
  position: absolute;
  left: 13%;
  bottom: 5px;
}

/* chartThree ul_NDTJ */
.chartThree button {
  background: none;
  border: 0.06px solid rgb(0, 174, 255);
  z-index: 1000;
  font-size: 1rem;
}

.chartThree button:nth-child(2) {
  position: absolute;
  top: 10px;
  right: 160px;
}

.chartThree button:nth-child(3) {
  position: absolute;
  top: 10px;
  right: 90px;
}

.chartThree button:nth-child(4) {
  position: absolute;
  top: 10px;
  right: 15px;
  margin-right: 5px;
}

.chartThree button:active {
  background-color: rgb(19, 166, 224);
}

.chartThree button:visited {
  background-color: rgb(19, 166, 224);
}
</style>