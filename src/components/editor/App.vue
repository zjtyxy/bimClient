<template>
  <a-spin :spinning="loading" wrapperClassName="global-spin">
    <ConfigProvider :locale="locale">
      <mars-editor ref="editorRef" :id="id" :full-name="name">
        <operation-pannel @childMounted="onChildMounted" />
      </mars-editor>
    </ConfigProvider>
  </a-spin>
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { ConfigProvider } from "ant-design-vue"
import { getQueryString } from "@/utils/util"

import OperationPannel from "@/components/mars3d/marsgis/operation.vue"
// import nprogress from "nprogress"
// import "nprogress/nprogress.css"
//
// const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

// const locale = zhCN
//
export default {
  components:{
    OperationPannel
  }
}
//
// const id = getQueryString("id")
// const name = getQueryString("name")
//
// function onChildMounted() {
//   // console.log("子组件加载完成了")
//   editorRef.value.setMap(window._map)
// }
//
// let loadingNum = 0
// window.$showLoading = globalProperties.$showLoading = (type = "mask") => {
//   loadingNum++
//   if (type === "mask") {
//     loading.value = true
//   } else if (type === "top") {
//     nprogress.start()
//     const interval = setInterval(() => {
//       if (nprogress.isStarted() && nprogress.status < 0.8) {
//         nprogress.set(nprogress.status + 0.1)
//       } else {
//         clearInterval(interval)
//       }
//     }, 500)
//   } else {
//     loadingNum--
//   }
// }
//
// window.$hideLoading = globalProperties.$hideLoading = (type = "mask") => {
//   loadingNum = Math.max(0, --loadingNum)
//   if (loadingNum === 0) {
//     if (type === "mask") {
//       loading.value = false
//     } else if (type === "top") {
//       nprogress.done()
//     } else {
//       loadingNum++
//     }
//   }
// }
</script>
<style lang="less" scoped>
//.global-spin {
//  height: 100%;
//  :deep(.ant-spin-container) {
//    height: 100%;
//  }
//  :deep(.ant-spin) {
//    max-height: inherit !important;
//  }
//}
//:deep(.global-spin > div) {
//  height: 100%;
//}
</style>
