<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <heating-unit-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit" :batchAdd="batchAdd"></heating-unit-form>
  </j-modal>
</template>

<script>

  import HeatingUnitForm from './HeatingUnitForm'
  export default {
    name: 'HeatingUnitModal',
    components: {
      HeatingUnitForm
    },
    data () {
      return {
        title:'',
        batchAdd:false,
        width:896,
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.batchAdd = this.batchAdd
          this.$refs.realForm.add();
        })
      },
      edit (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.batchAdd = false
          this.$refs.realForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>