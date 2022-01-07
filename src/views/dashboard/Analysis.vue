<template>

  <iframe  :id="id" :src="url" frameborder="0" width="100%" height="866px" scrolling="auto" style="background-color: #fff;"></iframe>

</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import RouteView from '@/components/layouts/RouteView'

export default {
  name: "IframePageContent",
  data () {
    return {
      url: "",
      id:""
    }
  },
  created () {
    this.goUrl()
  },
  updated () {
    this.goUrl()
  },
  watch: {
    $route(to, from) {
      this.goUrl();
    }
  },
  methods: {
    goUrl () {
      let url = `${window._CONFIG['domianURL']}/test/bigScreen/templat/index2`
      let id = this.$route.path
      this.id = id
      //url = "http://www.baidu.com"
      console.log("------url------"+url)
      if (url !== null && url !== undefined) {
        this.url = url;
        //window.open(this.url);
      }
    }
  }
}
</script>

<style>
</style>