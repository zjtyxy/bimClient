<template>
  <PannelComponent v-if="loaded" @vnode-mounted="onChildMounted"/>
</template>
<script>



export default {
  name: 'PannelComponent',
  props: {
    loaded: false,
    componentName: ''
  },
  methods: {
    onChildMounted() {
      this.$emit('childMounted')
    }

  },
  //emits: ["childMounted"],
  mounted() {

    let exampleId =   URL(window.location.href).searchParams.get('id')
    if (exampleId) {
      this.componentName = exampleId
      this.loaded = true
    }
  }
}
</script>

<style scoped lang="less"></style>
