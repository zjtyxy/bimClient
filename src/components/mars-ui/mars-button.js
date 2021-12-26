import { Button } from "ant-design-vue"


/**
 * 按钮
 *
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */

const MarsButton = defineComponent({
  name: "marsButton",
  inheritAttrs: false,
  setup (props, context) {
    return () => h(Button, { ...context.attrs, ...props }, context.slots)
  }
})

export function install (app) {
  app.component(MarsButton.name, MarsButton)
  return app
}
export default MarsButton
