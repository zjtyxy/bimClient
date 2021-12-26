import { Popover } from "ant-design-vue"
import { ColorPicker } from "vue-color-kit"
import MarsButton from "./mars-button"
import "./mars-color-picker.less"
/**
 * 颜色选择器
 */
const MarsColorPicker = defineComponent({
  name: "MarsColorPicker",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "#FFFFFF"
    }
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    let pointColor = props.value || ""
    const visible = false
    let colorObject= null

    const changeColor = (color) => {
      pointColor = color.hex
      colorObject = color
    }
    const cancel = () => {
      this.visible = false
      pointColor = props.value
    }
    const choose = () => {
      visible.value = false
      context.emit("update:value", pointColor)
      context.emit("change", colorObject)
    }

    const Buttons = [
      h(MarsButton, { size: "small", onClick: choose }, "确定"),
      h(MarsButton, { size: "small", class: "ml5", onClick: cancel }, "取消")
    ]

    const content = [h(ColorPicker, { suckerHide: false, color: pointColor, onChangeColor: changeColor }), h("div", { class: "f-tac" }, Buttons)]
    return () =>
      h(
        Popover,
        {
          trigger: "click",
          placement: "right",
          visible: visible,
          "onUpdate:visible": (v) => {
            this.visible = v
          }
        },
        {
          default: () => h("div", { class: "marsColorView", style: { backgroundColor: props.value } }),
          content: () => h("div", null, content)
        }
      )
  }
})

export function install(app) {
  app.component(MarsColorPicker.name, MarsColorPicker)
  return app
}
export default MarsColorPicker
