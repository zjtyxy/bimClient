<template>
  <a-radio-group :value="value" @update:value="valueChange">
    <a-radio :value="true">是</a-radio>
    <a-radio :value="false">否</a-radio>
  </a-radio-group>
</template>

<script>
export default {
  props:{
    value:{
      type: Boolean,
      required: false
    }
    },

  methods: {
    valueChange(value){
      this.$emit(update, value);
      this.$emit('change', value);
    }
  },
}
</script>
