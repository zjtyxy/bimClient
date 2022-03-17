<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="所属建筑" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="roomBuiding">
              <j-dict-select-tag type="list" v-model="model.roomBuiding" dictCode="building,building_number,id" placeholder="请选择所属建筑" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
              <a-input v-model="model.name" placeholder="请输入描述"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="供热方式" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="heatingMode">
              <j-dict-select-tag type="list" v-model="model.heatingMode" dictCode="heating_type" placeholder="请选择供热方式" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="建筑结构" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="buildingStructure">
              <j-dict-select-tag type="list" v-model="model.buildingStructure" dictCode="building_structure" placeholder="请选择建筑结构" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="建筑面积" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="buildingArea">
              <a-input v-model="model.buildingArea" placeholder="请输入建筑面积"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="建筑高度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="buildingHeight">
              <a-input-number v-model="model.buildingHeight" placeholder="请输入建筑高度" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所在楼层" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="roomLayer">
              <a-input-number v-model="model.roomLayer" placeholder="请输入所在楼层" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="所在单元" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="roomUnit">
              <a-input v-model="model.roomUnit" placeholder="请输入所在单元"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="基础高度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="baseHeight">
              <a-input-number v-model="model.baseHeight" placeholder="请输入基础高度" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="户型图" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="roomDiagram">
              <j-popup
                v-model="model.roomDiagram"
                field="roomDiagram"
                org-fields="name,unit_map,unit_height"
                dest-fields="name,roomDiagram,buildingHeight"
                code="unit_map_popup"
                :multi="true"
                @input="popupCallback"
                />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="roomNumber">
              <a-input v-model="model.roomNumber" placeholder="请输入房间编号"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'HeatingUnitForm',
    components: {
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
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
          add: "/project/heatingUnit/add",
          edit: "/project/heatingUnit/edit",
          queryById: "/project/heatingUnit/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
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
      submitForm () {
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
            })
          }
         
        })
      },
      popupCallback(value,row){
         this.model = Object.assign(this.model, row);
      },
    }
  }
</script>