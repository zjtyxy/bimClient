import { createApp } from "vue"
import Application from "./App.vue"
import { getQueryString } from "@/utils/util"
import marsEditorInstall from "mars-editor"
import MarsUI from "@/components/mars-ui"
// 加载全局样式
import "@/styles/index.less"

// https跳转处理
var protocol = window.location.protocol
if (protocol == "https:") {
  window.location.href = window.location.href.replace("https", "http")
}

const app = createApp(Application)

app.use(MarsUI)

console.log(process.env.VUE_APP_SOURCE_FILE)
console.log(process.env)
marsEditorInstall(app, {
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code") || "0",
  fullScreen: getQueryString("full") || "0",
  configLibs: window.configLibs,
  homepage: "http://mars3d.cn/example.html",
  configSource: `${process.env.BASE_URL}config/example.json`,
  sourceFile: process.env.VUE_APP_SOURCE_FILE === "1"
})

document.oncontextmenu = function (e) {
  e.preventDefault()
}

// 设置自适应高度指令
app.directive("auto-height", {
  mounted(el, binding) {
    const container = document.getElementById("sanbox-warpper")
    const loseHeight = binding.value || 0
    let wapperHeight = container?.clientHeight || 0
    el.style.height = `${wapperHeight - loseHeight}px`

    window.onresize = () => {
      wapperHeight = container?.clientHeight || 0
      const resizeHeight = wapperHeight - loseHeight
      el.style.height = `${resizeHeight}px`
    }
  }
})

app.mount("#app")
