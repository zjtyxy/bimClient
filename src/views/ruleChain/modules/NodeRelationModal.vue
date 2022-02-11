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
            <a-form-model-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fromId">
              <j-dict-select-tag type="list" v-model="model.fromId" dictCode="rule_node,name,id" placeholder="请选择来源" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="来源类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="formType">
              <j-dict-select-tag type="list" v-model="model.formType"  placeholder="请选择来源类型" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="目的" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="toId">
              <j-dict-select-tag type="list" v-model="model.toId" dictCode="rule_node,name,id" placeholder="请选择目的" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="目的类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="toType">
              <a-input v-model="model.toType"placeholder="请输入目的类型" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="关联类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <j-dict-select-tag v-model="model.type" placeholder="请输入关联类型"   dictCode="node_relation_type" ></j-dict-select-tag>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="关联类型组" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="typeGroup">
              <a-input v-model="model.typeGroup"placeholder="请输入关联类型组" ></a-input>
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
    name: "NodeRelationModal",
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
          add: "/rule/ruleChain/addNodeRelation",
          edit: "/rule/ruleChain/editNodeRelation",
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
            this.model['mainId'] = this.mainId
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
