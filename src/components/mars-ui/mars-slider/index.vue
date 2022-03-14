<template>
  <a-slider class="mars-slider" :value="value" :min="min" :max="max" :step="step" >
<!--    <template v-for="(comp, name) in slots" :key="name" v-slot:[name]>-->
<!--      <component :is="comp" />-->
<!--    </template>-->
  </a-slider>
</template>
<script>

export default {
  name: "mars-slider",
  inheritAttrs: false,
  props:{
    value:{
      type:Number,
      required:false
    },
    min:{
      type:Number,
      required:false
    },
    max:{
      type:Number,
      required:false
    },
    step:{
      type:Number,
      required:false
    }
  },
  data() {
    return {
      attrs:[],
      slots:[]
    };
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
@import '../base.less';
/*滑动条 未选择部分*/
.ant-slider-rail{
  background-color: #cde1de;
}

/*滑动条 输入面板内时修改高度等*/
.mars-slider {
  margin: 0px 6px 6px 6px;
  /deep/.ant-slider-mark-text {
    color: @mars-basecolor !important;
  }
  /*滑动条 未选择、已选择部分 高度*/
  /deep/.ant-slider-rail {
    height: 10px;
    border-radius: 5px;
    background-color: @mars-ordinary-color !important;
  }
  /deep/.ant-slider-track {
    height: 10px;
    border-radius: 5px;
    background-color: @primary-color !important;
  }
  /*滑动条 刻度点*/
  /deep/.ant-slider-dot {
    border-color: @border-color-base;
    background-color: #16212c7d;
    top: -1px;
    height: 12px;
    width: 12px;
  }
  /deep/.ant-slider-dot:first-child{
    margin-left: -1px;
  }
  /deep/.ant-slider-dot:last-child {
    right: -1px;
    left: auto !important;
  }

  /*滑动条 拖拽点*/
  /deep/.ant-slider-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-top: -4px;
  }
  /deep/.ant-slider-dot-active, .ant-slider-handle {
    border-color: @primary-color !important;
  }
}
</style>
