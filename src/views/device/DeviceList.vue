<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('设备信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
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
        class="j-table-force-nowrap"
        :scroll="{x:true}"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type:'radio'}"
        :customRow="clickThenSelect"
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
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="属性表" key="1" >
        <AttributeKvList :mainId="selectedMainId" />
      </a-tab-pane>
      <a-tab-pane tab="认证信息" key="2" forceRender>
        <DeviceCredentialsList :mainId="selectedMainId" />
      </a-tab-pane>
    </a-tabs>

    <device-modal ref="modalForm" @ok="modalFormOk"></device-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import DeviceModal from './modules/DeviceModal'
  import { getAction } from '@/api/manage'
  import AttributeKvList from './AttributeKvList'
  import DeviceCredentialsList from './DeviceCredentialsList'
  import { loadCategoryData } from '@/api/api'
  import {initDictOptions,filterMultiDictText} from '@/components/dict/JDictSelectUtil'
  import '@/assets/less/TableExpand.less'

  export default {
    name: "DeviceList",
    mixins:[JeecgListMixin],
    components: {
      AttributeKvList,
      DeviceCredentialsList,
      DeviceModal
    },
    data () {
      return {
        description: '设备信息管理页面',
        // 表头
        columns: [
          {
            title:'客户',
            align:"center",
            dataIndex: 'customerName'
          },
          {
            title:'类型',
            align:"center",
            dataIndex: 'type',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['type'], text+"")
              }
            }
          },
          {
            title:'名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'标记',
            align:"center",
            dataIndex: 'labelT'
          },
          {
            title:'凭证类型',
            align:"center",
            dataIndex: 'authType_dictText',
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
          list: "/device/device/list",
          delete: "/device/device/delete",
          deleteBatch: "/device/device/deleteBatch",
          exportXlsUrl: "/device/device/exportXls",
          importExcelUrl: "device/device/importExcel",
        },
        dictOptions:{
         authType:[],
        },
        /* 分页参数 */
        ipagination:{
          current: 1,
          pageSize: 5,
          pageSizeOptions: ['5', '10', '50'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        selectedMainId:'',
        superFieldList:[],
      }
    },
    created() {
      this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
        loadCategoryData({code:"B03"}).then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'type', res.result)
          }
        })
        initDictOptions('auth_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'authType', res.result)
          }
        })
      },
      clickThenSelect(record) {
        return {
          on: {
            click: () => {
              this.onSelectChange(record.id.split(","), [record]);
            }
          }
        }
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.selectedMainId=''
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedMainId=selectedRowKeys[0]
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        this.onClearSelected()
        var params = this.getQueryParams();//查询条件
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message)
          }
          this.loading = false;
        })
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