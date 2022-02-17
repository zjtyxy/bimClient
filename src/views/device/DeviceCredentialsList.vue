<template>
  <a-card :bordered="false" :class="'cust-erp-sub-tab'">
    <!-- 操作按钮区域 -->
    <div class="table-operator" v-if="mainId">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('认证信息')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel">
          <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :scroll="{x:true}"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
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
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>

    <deviceCredentials-modal ref="modalForm" @ok="modalFormOk" :mainId="mainId"></deviceCredentials-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import DeviceCredentialsModal from './modules/DeviceCredentialsModal'

  export default {
    name: "DeviceCredentialsList",
    mixins:[JeecgListMixin],
    components: { DeviceCredentialsModal },
    props:{
      mainId:{
        type:String,
        default:'',
        required:false
      }
    },
    watch:{
      mainId:{
        immediate: true,
        handler(val) {
          if(!this.mainId){
            this.clearList()
          }else{
            this.queryParam['deviceId'] = val
            this.loadData(1);
          }
        }
      }
    },
    data () {
      return {
        description: '设备信息管理页面',
        disableMixinCreated:true,
        // 表头
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
            title:'认证类型',
            align:"center",
            dataIndex: 'deviceCredentialsType_dictText',
          },
          {
            title:'认证ID',
            align:"center",
            dataIndex: 'credentialsId'
          },
          {
            title:'认证值',
            align:"center",
            dataIndex: 'credentialsValue'
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
        url: {
          list: "/device/device/listDeviceCredentialsByMainId",
          delete: "/device/device/deleteDeviceCredentials",
          deleteBatch: "/device/device/deleteBatchDeviceCredentials",
          exportXlsUrl: "/device/device/exportDeviceCredentials",
          importUrl: "/device/device/importDeviceCredentials",
        },
        dictOptions:{
         authType:[],
        },
        superFieldList:[],
      }
    },
    created() {
      this.getSuperFieldList();
    },
    computed: {
      importExcelUrl(){
        return `${window._CONFIG['domianURL']}/${this.url.importUrl}/${this.mainId}`;
      }
    },
    methods: {
      clearList(){
        this.dataSource=[]
        this.selectedRowKeys=[]
        this.ipagination.current = 1
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'popup',value:'customerName',text:'客户', popup:{code:'pop_customer',field:'id',orgFields:'id',destFields:'customer_id'}})
        fieldList.push({type:'string',value:'type',text:'类型'})
        fieldList.push({type:'string',value:'name',text:'名称',dictCode:''})
        fieldList.push({type:'string',value:'labelT',text:'标记',dictCode:''})
        fieldList.push({type:'string',value:'searchText',text:'描述',dictCode:''})
        fieldList.push({type:'Text',value:'additionalInfo',text:'附加信息',dictCode:''})
        fieldList.push({type:'string',value:'deviceProfileId',text:'设备配置',dictCode:'device_profile,name,id'})
        fieldList.push({type:'string',value:'firmwareId',text:'固件ID',dictCode:''})
        fieldList.push({type:'string',value:'softwareId',text:'软件ID',dictCode:''})
        fieldList.push({type:'Text',value:'deviceData',text:'设备数据',dictCode:''})
        fieldList.push({type:'string',value:'authType',text:'凭证类型',dictCode:'auth_type'})
        fieldList.push({type:'string',value:'authToken',text:'凭证',dictCode:''})
        fieldList.push({type:'Text',value:'geoInfo',text:'地理数据',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
