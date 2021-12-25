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
        <a-form-model-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
          <a-input v-model="model.name" placeholder="请输入名称" ></a-input>
        </a-form-model-item>
        <a-form-model-item label="类别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="category">
          <a-input v-model="model.category" placeholder="请输入类别" ></a-input>
        </a-form-model-item>
        <a-form-model-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
          <a-input v-model="model.type" placeholder="请输入类型" ></a-input>
        </a-form-model-item>
        <a-form-model-item  label="外部ID" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="externalId">
          <a-input v-model="model.externalId"  disabled ></a-input>
        </a-form-model-item>
        <a-form-model-item label="所属模型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="modelId">
          <j-dict-select-tag disabled type="list" v-model="model.modelId"  dictCode="bim_model,name,id" placeholder="请选择所属模型" />
        </a-form-model-item>
      </a-form-model>
      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt=""
               style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
<!--          <a-divider type="vertical"/>-->
<!--          <a @click="handleDetail(record)">详情</a>-->
          <a-divider type="vertical"/>
             <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
            <a-divider type="vertical"/>

        </span>

      </a-table>
    </a-spin>
    <bim-model-attrs-categories-modal ref="modalForm" @ok="modalFormOk"/>
  </j-modal>
</template>

<script>
   import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction } from '@/api/manage'
   import BimModelAttrsCategoriesModal from './BimModelAttrsCategoriesModal'
  import { validateDuplicateValue } from '@/utils/util'
  export default {
    name: "BimModelAttrsModal",
    mixins:[JeecgListMixin],
    components: {
      BimModelAttrsCategoriesModal
    },
    data () {
      return {
        title:"操作",
        width:800,
        visible: false,
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'数量',
            align:"center",
            dataIndex: 'count'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' },
          }
        ],
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
          add: "/bim/bimModelAttrs/add",
          edit: "/bim/bimModelAttrs/edit",
          list: "/bim/bimModelAttrsCategories/list",
          delete: "/bim/bimModelAttrsCategories/delete",
          deleteBatch: "/bim/bimModelAttrsCategories/deleteBatch",
          exportXlsUrl: "/bim/bimModelAttrsCategories/exportXls",
          importExcelUrl: "bim/bimModelAttrsCategories/importExcel",
        },
        expandedRowKeys:[],
        pidField:"parentId"

      }
    },
    created () {
       //备份model原始值

       this.modelDefault = JSON.parse(JSON.stringify(this.model));

    },
    methods: {
      add (obj) {
        this.modelDefault.parentId=''
        this.edit(Object.assign(this.modelDefault , obj));
      },
      edit (record) {
        this.model = Object.assign({}, record);
        debugger
     //   this.queryParam.test=this.model.externalId;
        this.queryParam.mainId=this.model.dbId;
        this.searchQuery()
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.$refs.form.clearValidate()
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
             if(this.model.id && this.model.id === this.model[this.pidField]){
              that.$message.warning("父级节点不能选择自己");
              that.confirmLoading = false;
              return;
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                this.$emit('ok');
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
      submitSuccess(formData,flag){
        if(!formData.id){
          let treeData = this.$refs.treeSelect.getCurrTreeData()
          this.expandedRowKeys=[]
          this.getExpandKeysByPid(formData[this.pidField],treeData,treeData)
          this.$emit('ok',formData,this.expandedRowKeys.reverse());
        }else{
          this.$emit('ok',formData,flag);
        }
      },
      getExpandKeysByPid(pid,arr,all){
        if(pid && arr && arr.length>0){
          for(let i=0;i<arr.length;i++){
            if(arr[i].key==pid){
              this.expandedRowKeys.push(arr[i].key)
              this.getExpandKeysByPid(arr[i]['parentId'],all,all)
            }else{
              this.getExpandKeysByPid(pid,arr[i].children,all)
            }
          }
        }
      }


    }
  }
</script>