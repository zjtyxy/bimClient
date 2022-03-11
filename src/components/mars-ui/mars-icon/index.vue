<template>
  <Icon class="mars-icon" v-bind="attrs"></Icon>
</template>
<script>

export default{
  name: "mars-icon",
  inheritAttrs: false,
  components: {
      Icon
  },
  computed() {
    // const attrs = Icon.useAttrs()
    //
    // return {
    //   attrs
    // }
  }
}
</script>
<style lang="less" scoped>
.mars-icon{
  vertical-align: sub;
}
</style>
