<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="描述">
              <a-input placeholder="请输入描述" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="供热方式">
              <j-dict-select-tag placeholder="请选择供热方式" v-model="queryParam.heatingMode" dictCode="heating_type"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="建筑结构">
                <j-dict-select-tag placeholder="请选择建筑结构" v-model="queryParam.buildingStructure"
                                   dictCode="building_structure"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所在单元">
                <a-input placeholder="请输入所在单元" v-model="queryParam.roomUnit"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button @click="handleBatchAdd" type="primary" icon="plus">批量新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('房屋单元')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal"
                     @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
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

    <heating-unit-modal ref="modalForm" @ok="modalFormOk"></heating-unit-modal>

  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import HeatingUnitModal from './modules/HeatingUnitModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'
import RoomShowModal from '@views/baseInfo/modules/RoomShowModal'

export default {
  name: 'HeatingUnitList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    RoomShowModal,
    HeatingUnitModal
  },
  data() {
    return {
      description: '房屋单元管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '所属建筑',
          align: 'center',
          dataIndex: 'roomBuiding_dictText'
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '供热方式',
          align: 'center',
          dataIndex: 'heatingMode_dictText'
        },
        {
          title: '建筑结构',
          align: 'center',
          dataIndex: 'buildingStructure_dictText'
        },
        {
          title: '建筑面积',
          align: 'center',
          dataIndex: 'buildingArea'
        },
        {
          title: '建筑高度',
          align: 'center',
          dataIndex: 'buildingHeight'
        },
        {
          title: '所在楼层',
          align: 'center',
          dataIndex: 'roomLayer'
        },
        {
          title: '所在单元',
          align: 'center',
          dataIndex: 'roomUnit'
        },
        {
          title: '基础高度',
          align: 'center',
          dataIndex: 'baseHeight'
        },
        {
          title: '房间编号',
          align: 'center',
          dataIndex: 'roomNumber'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/project/heatingUnit/list',
        delete: '/project/heatingUnit/delete',
        deleteBatch: '/project/heatingUnit/deleteBatch',
        exportXlsUrl: '/project/heatingUnit/exportXls',
        importExcelUrl: 'project/heatingUnit/importExcel',

      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    this.getSuperFieldList()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {
    },

    handleBatchAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '批量新增'
      this.$refs.modalForm.batchAdd = true
      this.$refs.modalForm.disableSubmit = false
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.batchAdd = false
      this.$refs.modalForm.disableSubmit = false
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'roomBuiding', text: '所属建筑', dictCode: 'building,building_number,id' })
      fieldList.push({ type: 'string', value: 'name', text: '描述', dictCode: '' })
      fieldList.push({ type: 'string', value: 'heatingMode', text: '供热方式', dictCode: 'heating_type' })
      fieldList.push({ type: 'string', value: 'buildingStructure', text: '建筑结构', dictCode: 'building_structure' })
      fieldList.push({ type: 'string', value: 'buildingArea', text: '建筑面积', dictCode: '' })
      fieldList.push({ type: 'double', value: 'buildingHeight', text: '建筑高度', dictCode: '' })
      fieldList.push({ type: 'int', value: 'roomLayer', text: '所在楼层', dictCode: '' })
      fieldList.push({ type: 'string', value: 'roomUnit', text: '所在单元', dictCode: '' })
      fieldList.push({ type: 'double', value: 'baseHeight', text: '基础高度', dictCode: '' })
      fieldList.push({
        type: 'popup',
        value: 'roomDiagram',
        text: '户型图',
        popup: { code: 'unit_map_popup', field: 'name', orgFields: 'name', destFields: 'name' }
      })
      fieldList.push({ type: 'string', value: 'roomNumber', text: '房间编号', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>