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
            <a-form-model-item label="客户" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="customerName">
              <j-popup
                v-model="model.customerName"
               field="customerName"
                org-fields="id,title"
                dest-fields="customerId,customerName"
                code="pop_customer"
                :multi="true"
                @input="popupCallback"
                />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <j-category-select v-model="model.type" pcode="B03" placeholder="请选择类型"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
              <a-input v-model="model.name" placeholder="请输入名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="标记" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="labelT">
              <a-input v-model="model.labelT" placeholder="请输入标记" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="searchText">
              <a-input v-model="model.searchText" placeholder="请输入描述" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="附加信息" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="additionalInfo">
              <a-input v-model="model.additionalInfo" placeholder="请输入附加信息" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="设备配置" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="deviceProfileId">
              <j-dict-select-tag type="list" v-model="model.deviceProfileId" dictCode="device_profile,name,id" placeholder="请选择设备配置" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="固件ID" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="firmwareId">
              <a-input v-model="model.firmwareId" placeholder="请输入固件ID" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="软件ID" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="softwareId">
              <a-input v-model="model.softwareId" placeholder="请输入软件ID" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="设备数据" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="deviceData">
              <a-input v-model="model.deviceData" placeholder="请输入设备数据" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="凭证类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="authType">
              <j-dict-select-tag type="list" v-model="model.authType" dictCode="auth_type" placeholder="请选择凭证类型" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="凭证" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="authToken">
              <a-input v-model="model.authToken" placeholder="请输入凭证" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="地理数据" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="geoInfo">
              <a-textarea v-model="model.geoInfo" rows="4" placeholder="请输入地理数据" disabled/>
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
    name: "DeviceModal",
    components: { 
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
          add: "/device/device/add",
          edit: "/device/device/edit",
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
      popupCallback(value,row){
        this.model = Object.assign(this.model, row);
      },
      handleCategoryChange(value,backObj){
        this.model = Object.assign(backObj,this.model);
      }

      
    }
  }
</script>