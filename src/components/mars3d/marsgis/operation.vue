<template>
  <PannelComponent v-if="loaded" @vnode-mounted="onChildMounted"/>
</template>
<script lang="ts">
/**
 * 操作面板入口
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */

import {getQueryString} from "@/utils/util"
export default {
  name: 'PannelComponent',
  props: ['componentName'],
  emits: ["childMounted"],
  created() {
    let loaded = false;
    let exampleId = getQueryString("id")
    if (exampleId) {
      this.componentName = exampleId
      loaded = true
    }
  }
}
</script>

<style scoped lang="less"></style>
