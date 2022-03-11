<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="model" :rules="validatorRules">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="客户" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="customerName">
              <j-popup disabled
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
          <a-col :span="12">
            <a-form-model-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <j-category-select disabled v-model="model.type" pcode="B03" placeholder="请选择类型"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
              <a-input disabled v-model="model.name" placeholder="请输入名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="标记" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="labelT">
              <a-input disabled v-model="model.labelT" placeholder="请输入标记" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="searchText">
              <a-input disabled v-model="model.searchText" placeholder="请输入描述" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24"  v-for="item in deviceAttr" :key="item.id">
            <a-form-model-item  :label="item.attributeKey" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="searchText">
              <a-input disabled v-model="item.value"  v-if="item.dataType=='STRING'" ></a-input>
              <j-switch v-model="item.value"  v-if="item.dataType=='BOOLEAN'"></j-switch>
              <a-input-number  v-model="item.value"  v-if="item.dataType=='DOUBLE'" />
              <a-slider v-model="item.value"  v-if="item.dataType=='LONG'"/>
              <j-date v-model="item.value" showTime="true" dateFormat="YYYY-MM-DD HH:mm:ss" v-if="item.dataType=='DATETIME'"/>
            </a-form-model-item>
          </a-col>
<!--          <a-col :span="12">-->
<!--            <a-form-model-item label="地理数据" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="geoInfo">-->
<!--              <a-textarea disabled v-model="model.geoInfo" rows="4" placeholder="请输入地理数据"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
        </a-row>
      </a-form-model>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'
  import { deleteAction, getAction,downFile,getFileAccessHttpUrl } from '@/api/manage'
  export default {
    name: "DeviceFlatModal",
    components: {
    },
    data () {
      return {
        title:"操作",
        width:800,
        deviceAttr:null,
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
          attrlist: "/device/device/listAttributeKvByMainId"
        }

      }
    },
    created () {
    //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));

    },
    methods: {
      loadAttr()
      {
        var params ={"mainId":this.model.id};
        getAction(this.url.attrlist, params).then((res) => {
          if (res.success) {
            //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
            this.deviceAttr = res.result.records||res.result;

          }else{
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      },
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
        this.loadAttr();
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