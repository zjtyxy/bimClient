<template>
  <a-card :bordered="false">
    <!-- table区域-begin -->
    <div>
      <div class="count-wrap">
        <div v-for="item in dataSource" :key="item.id"  @click="handleDetail(item)"  class="count-item count-item-01">
          <p class="count-title">{{ item.name }}</p>
          <p class="count-num">{{ showDeviceType(item.type ) }}</p>
        </div>
      </div>

    </div>
    <device-flat-modal ref="modalForm" @ok="modalFormOk"></device-flat-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { getAction } from '@/api/manage'
import Vue from 'vue'
import { ACCESS_TOKEN, TENANT_ID } from '@/store/mutation-types'
import axios from 'axios'
import {initDictOptions,filterMultiDictText} from '@/components/dict/JDictSelectUtil'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { loadCategoryData } from '@/api/api'
import DeviceFlatModal from './modules/DeviceFlatModal'
export default {
  name: "DeviceList",
  mixins:[JeecgListMixin],
  components: {
    DeviceFlatModal
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
    showDeviceType(type)
    {
      return filterMultiDictText(this.dictOptions['type'], type+"")
    },
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
<style lang="less" scoped>
@import '~@assets/less/common.less';
.count-wrap {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  .count-item {
    width: 367px;
    height: 170px;
    margin-left: 60px;
    margin-right: 20px;
    margin-top: 30px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fff;

    box-shadow: 2px 3px 6px rgba(0, 60, 128, 0.16);
    border-radius: 10px;
    position: relative;
    p {
      margin: 0;
      padding: 0;
    }
    .count-title {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      text-shadow: 0px 0px 4px rgba(1, 49, 113, 0.41);
      letter-spacing: 2px;
    }
    .count-num {
      text-align: center;
      line-height: 170px;
      font-size: 20px;
      letter-spacing: 4px;
      text-shadow: 2px 2px 4px rgba(0, 44, 101, 0.3);
      font-weight: 500;
    }
  }
  .count-item-01 {
    background-image: url(../../assets/count_bg_01.png);
  }
  .count-item-02 {
    background-image: url(../../assets/count_bg_02.png);
  }
  .count-item-03 {
    background-image: url(../../assets/count_bg_03.png);
  }
  .count-item-04 {
    background-image: url(../../assets/count_bg_04.png);
  }
}
</style>