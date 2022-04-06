<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      title="选择用户"
      append-to-body
      :custom-class="
        `bordered-dialog ${multiple ? 'box-md-760 box-lg-840' : ''}`
      "
      @opened="onOpen"
      @closed="onClosed"
    >
      <div class="hbox hbox-auto-sm user-menu-container">
        <div class="col b-r b-hide-sm">
          <div class="flex-body">
            <div class="flex-other p-10 b-b">
              <div class="filter-container no-padder">
                <base-list-status-filter
                  :options="listFilter.select"
                  :list-query.sync="listQuery"
                  @change="handleFilter"
                />

                <base-list-search-filter
                  :options.sync="listFilter.search"
                  :list-query.sync="listQuery"
                  :options-type="true"
                  @change="handleFilter"
                />
              </div>
            </div>
            <div class="flex-main h-max-600">
              <div class="flex-body">
                <div class="flex-other">
                  <div class="p-v-10 p-h-20">共 {{ total }} 个用户</div>
                </div>
                <div class="flex-main p-h-10">
                  <base-refresh-list
                    v-if="visible"
                    ref="refreshList"
                    :get-list="getList"
                  >
                    <template v-slot:item="{ item, index }">
                      <user-item
                        :item="item"
                        :index="index"
                        :type="item.itemType"
                        @handleClickItem="handleClickItem"
                        @handleClickClosed="handleClickClosed"
                      />
                    </template>
                  </base-refresh-list>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="multiple"
          class="col box box-md-320 box-lg-360 b-t b-show-sm"
        >
          <div class="flex-body">
            <div class="flex-other">
              <div class="p-v-10 p-h-20">已选择用户 {{ curSelected.length }} 个</div>
            </div>
            <div class="flex-main">
              <el-scrollbar
                v-if="curSelected.length"
                class="padder-sm p-b-sm"
              >
                <user-item
                  v-for="(item, index) in curSelected"
                  :key="item.id"
                  :item="item"
                  :index="index"
                  :type="item.itemType"
                  @handleClickItem="handleClickSelectedItem"
                  @handleClickClosed="handleClickSelectedClosed"
                />
              </el-scrollbar>

              <base-no-data v-else />
            </div>
          </div>
        </div>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-waves
          @click="visible = false"
        >取 消</el-button>
        <el-button
          v-waves
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

import MultipleSelectionMixin from './mixins/MultipleSelectionMixin'

import UserItem from '@/components/modules/UserItem'

const listQuery = {
  page: 1,
  size: 20,
  roleCode: '',
  searchType: '',
  keyword: '',
}

export default {
  name: 'MultipleSelectionUserDialog',
  components: {
    UserItem,
  },
  mixins: [MultipleSelectionMixin],
  props: {
    params: {
      type: Object,
      default: function () {
        return {}
      },
    },
    select: {
      type: Array,
      default: function () {
        return []
      },
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      total: 0,
      listQuery: _.cloneDeep(listQuery),
      listFilter: {
        search: {
          list: _datas.user.USER_SEARCH_LIST,
          state: _datas.user.USER_SEARCH_LIST[0].key,
          value: '',
          filter: 'userSearchFilter',
          searchConfig: {
            searchType: {
              value: 'searchType',
            },
            keyword: {
              value: 'keyword',
            },
          },
        },
        select: {
          roleCode: {
            label: '角色类型',
            list: _datas.user.USER_ROLE_LIST,
          },
        },
      },
      curSelected: [],
    }
  },
  mounted() {},
  methods: {
    onOpen() {
      console.log.info('========onOpen')
      this.listQuery = _.assign(_.cloneDeep(listQuery), this.params)
      // 获取课程
      this.handleFilter()
    },
    onClosed() {
      console.log.info('========onClosed')
      this.curSelected = []
    },
    handleCreate() {
      this.visible = true
    },
    handleConfirm() {
      this.visible = false
      const selecteds = _.cloneDeep(this.curSelected)
      this.$emit('handleSelectSuccess', selecteds)
    },
    async getList({ pageIndex, pageSize }) {
      // 根据分类及课程名称 获取课程
      try {
        this.listQuery.page = pageIndex
        this.listQuery.size = pageSize

        const { rows = [], total = 0 } = await getUserList(this.listQuery)
        this.total = total

        return {
          rows: this._processListToMultipleItem(rows),
          total,
        }
      } catch (error) {
        console.log.error(error)
      }
    },
    handleFilter() {
      this.$refs.refreshList.onRefresh()
    },
    handleClickItem(index, item) {
      this._handleClickItem(index, item)
    },
    handleClickClosed(index) {
      // console.log.info('---------检测到icon点击----', index)
    },
    handleClickSelectedItem(index) {
      // console.log.info('---------检测到item点击----', index)
    },
    handleClickSelectedClosed(index) {
      this._handleClickSelectedClosed(index)
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.category-menu {
  &.el-menu {
    border-right-width: 0;
  }

  .el-menu-item {
    height: 35px;
    line-height: 35px;

    &.is-active {
      background: #e6f7ff;
    }
  }
}
</style>
