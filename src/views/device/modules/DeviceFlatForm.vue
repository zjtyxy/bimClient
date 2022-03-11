<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <!-- 主表单区域 -->
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="12" >
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
          <a-col :span="12" >
            <a-form-model-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <j-category-select v-model="model.type" pcode="B03" placeholder="请选择类型"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="12" >
            <a-form-model-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
              <a-input v-model="model.name" placeholder="请输入名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12" >
            <a-form-model-item label="标记" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="labelT">
              <a-input v-model="model.labelT" placeholder="请输入标记" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12" >
            <a-form-model-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="searchText">
              <a-input v-model="model.searchText" placeholder="请输入描述" ></a-input>
            </a-form-model-item>
          </a-col>

          <a-col :span="24">
            <a-form-model-item label="地理数据" :labelCol="labelCol2" :wrapperCol="wrapperCol2" prop="geoInfo">
              <a-textarea v-model="model.geoInfo" rows="4" placeholder="请输入地理数据" disabled/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
      <!-- 子表单区域 -->
    <a-tabs v-model="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="属性表" :key="refKeys[0]" :forceRender="true">
        <j-editable-table
          :ref="refKeys[0]"
          :loading="attributeKvTable.loading"
          :columns="attributeKvTable.columns"
          :dataSource="attributeKvTable.dataSource"
          :maxHeight="300"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :actionButton="true"/>
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script>

  import { getAction } from '@/api/manage'
  import { FormTypes,getRefPromise,VALIDATE_NO_PASSED } from '@/utils/JEditableTableUtil'
  import { JEditableTableModelMixin } from '@/mixins/JEditableTableModelMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'DeviceFlatForm',
    mixins: [JEditableTableModelMixin],
    components: {
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        labelCol2: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol2: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
        model:{
        },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['attributeKv', ],
        tableKeys:['attributeKv', ],
        activeKey: 'attributeKv',
        // 属性表
        attributeKvTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '属性范围',
              key: 'entityType',
              type: FormTypes.select,
              dictCode:"attr_type",
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '属性名称',
              key: 'attributeKey',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '属性类型',
              key: 'attributeType',
              type: FormTypes.select,
              dictCode:"attr_value_type",
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '布尔值',
              key: 'booleanvalue',
              type: FormTypes.inputNumber,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '字符串值',
              key: 'strvalue',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '整数值',
              key: 'longvalue',
              type: FormTypes.inputNumber,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '双精度值',
              key: 'doublevalue',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: 'Json值',
              key: 'jsonvalue',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '最后更新',
              key: 'lastupdatets',
              type: FormTypes.date,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
          ]
        },
        url: {
          add: "/device/device/add",
          edit: "/device/device/edit",
          queryById: "/device/device/queryById",
          attributeKv: {
            list: '/device/device/queryAttributeKvByMainId'
          },
        }
      }
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
    },
    methods: {
      addBefore(){
        this.attributeKvTable.dataSource=[]
      },
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.attributeKv.list, params, this.attributeKvTable)
        }
      },
      //校验所有一对一子表表单
      validateSubForm(allValues){
          return new Promise((resolve,reject)=>{
            Promise.all([
            ]).then(() => {
              resolve(allValues)
            }).catch(e => {
              if (e.error === VALIDATE_NO_PASSED) {
                // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
                this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
              } else {
                console.error(e)
              }
            })
          })
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开
          attributeKvList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(value,row){
       this.model = Object.assign(this.model, row);
     },
     handleCategoryChange(value,backObj){
      this.model = Object.assign(this.model, backObj);
      }

    }
  }
</script>

<style scoped>
</style>