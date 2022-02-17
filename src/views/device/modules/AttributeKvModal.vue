<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="model" :rules="validatorRules">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="属性范围" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="entityType">
              <j-dict-select-tag type="list" v-model="model.entityType" dictCode="attr_type" placeholder="请选择属性范围" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="属性名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="attributeKey">
              <a-input v-model="model.attributeKey"placeholder="请输入属性名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="属性类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="attributeType">
              <j-dict-select-tag type="list" v-model="model.attributeType" dictCode="attr_value_type" placeholder="请选择属性类型" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="布尔值" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="booleanValue">
              <a-input-number v-model="model.booleanValue"placeholder="请输入布尔值" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字符串值" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="strValue">
              <a-input v-model="model.strValue"placeholder="请输入字符串值" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="整数值" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="longValue">
              <a-input-number v-model="model.longValue"placeholder="请输入整数值" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="双精度值" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="doubleValue">
              <a-input v-model="model.doubleValue"placeholder="请输入双精度值" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="Json值" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="jsonValue">
              <a-input v-model="model.jsonValue"placeholder="请输入Json值" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="最后更新" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="lastupdatets">
              <j-date placeholder="请选择最后更新" v-model="model.lastupdatets" style="width: 100%" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "AttributeKvModal",
    components: {
    },
    props:{
      mainId:{
        type:String,
        required:false,
        default:''
      }
    },
    data () {
      return {
        title:"操作",
        width:800,
        visible: false,
        model:{
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        validatorRules: {
        },
        url: {
          add: "/device/device/addAttributeKv",
          edit: "/device/device/editAttributeKv",
        }

      }
    },
    created () {
    //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.$refs.form.clearValidate();
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            this.model['entityId'] = this.mainId
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }else{
             return false
          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>
