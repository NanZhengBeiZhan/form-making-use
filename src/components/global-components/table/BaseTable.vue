<template>
  <div>
    <el-table
      ref="baseTable"
      v-el-height-adaptive-table="adaptiveTableOptions"
      v-loading="loading"
      :data="list"
      :height="tableHeight"
      border
      fit
      highlight-current-row
      row-key="id"
      row-class-name
      style="width: 100%;"
      :cell-class-name="setCellClassName"
      v-bind="$attrs"
      @sort-change="_onSortChange"
      @selection-change="val => emitEventHandler('selectionChange', val)"
      v-on="$listeners"
      @row-click="(row)=>$emit('handleClickRow',row)"
    >
      <el-table-column
        v-if="dragRow"
        type="normal"
        label="排序"
        align="center"
        width="50px"
        fixed="left"
      >
        <i class="qker-icon-drag"></i>
      </el-table-column>

      <el-table-column
        v-if="hasCheckbox"
        type="selection"
        align="center"
        fixed="left"
      ></el-table-column>

      <el-table-column
        v-if="hasIndex"
        type="index"
        label="序号"
        align="center"
        width="60px"
        :index="indexMethod"
      />

      <el-table-column
        v-for="(tItem, key) in tableList"
        :key="key"
        :prop="key"
        :label="tItem.label"
        :type="tableItemType(tItem)"
        v-bind="tItem.options"
      >
        <template slot-scope="scope">
          <!-- 如果为操作项时，渲染公共下拉操作列表 -->
          <base-button-list
            v-if="tItem.type === 'operation' && operation"
            :is-fold="filterOperationFun(scope.row, 'isFold')"
            :click-list="filterOperationFun(scope.row, 'list')"
            :params="scope.row"
            :options="filterOperationFun(scope.row, 'options')"
            @handleBtnListClick="btnListClick"
          />

          <base-table-item-cont
            v-else
            :table-key="key"
            :table-item="tItem"
            :item="scope.row"
            :expand-list="expandList"
          >
            <template v-slot:blank="{ cItem, cKey }">
              <slot
                name="blank"
                :cItem="cItem"
                :cKey="cKey"
              />
            </template>
          </base-table-item-cont>
        </template>
      </el-table-column>
    </el-table>

    <base-pagination
      v-if="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      :auto-scroll="autoScroll"
      :scroll-element="scrollElementSelector"
      @pagination="onPagination"
    />
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'BaseTable',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    listQuery: {
      type: Object,
      default: () => {
        return {
          size: 20,
          page: 1,
        }
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tableList: {
      type: Object,
      default: () => {},
    },
    expandList: {
      type: Object,
      default: () => {},
    },
    hasIndex: {
      type: Boolean,
      default: true,
    },
    hasCheckbox: {
      type: Boolean,
      default: false,
    },
    operation: {
      type: [Object, Function],
      default: null,
    },
    btnListClick: {
      type: Function,
      default: () => {},
    },
    onPagination: {
      type: Function,
      default: () => {},
    },
    hasAdaptive: {
      type: Boolean,
      default: true,
    },
    // 自定义计算高度指令的参数
    adaptiveTable: {
      type: [Object],
      default: () => {},
    },
    // 是否在分页时自动重置定位
    autoScroll: {
      type: Boolean,
      default: true,
    },
    // 重新设置滚动区域的节点
    scrollElementSelector: {
      type: String,
      default: null,
    },

    // 需排序的列与实际操作的key值的对象关系
    sortKeysMap: {
      type: [Object, Function],
      default: null,
    },
    // 是否启用多条件排序
    mutilSort: {
      type: Boolean,
      default: false,
    },

    // 是否启用拖拽列排序
    dragCol: {
      type: Boolean,
      default: false,
    },
    // 是否启用拖拽行排序
    dragRow: {
      type: Boolean,
      default: false,
    },
    tableHeight: {
      type: [String, Boolean],
      default: '600px',
    }, // table的高度 '' 则默认自适应
  },
  data() {
    return {
      activeThead: {}, //保存所选择的表头
    }
  },
  computed: {
    adaptiveTableOptions() {
      if (this.hasAdaptive) {
        return {
          ...this.adaptiveTable,
          scrollElement: this.scrollElementSelector,
        }
      } else {
        return false
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        if (this.dragRow) {
          this._bindRowDrop()
        }

        if (this.dragCol) {
          this._bindColDrop()
        }
      })
    }, 50)
  },
  methods: {
    // 针对element表格列的类型做处理，当类型不为其中之一时可能出现无法预料的问题
    tableItemType({ type } = {}) {
      const elTableType = ['selection', 'index', 'expand']
      if (!elTableType.includes(type)) {
        return 'default'
      } else {
        return type
      }
    },
    filterOperationFun(row, key) {
      if (!_.isObject(this.operation)) {
        return {}
      }

      if (_.isFunction(this.operation)) {
        const newObj = this.operation(row)
        return newObj && newObj[key]
      } else {
        return this.operation[key]
      }
    },
    indexMethod(index) {
      if (this.total) {
        return (this.listQuery.page - 1) * this.listQuery.size + index + 1
      } else {
        return index + 1
      }
    },
    // 调用el-table上的事件
    dispatchTableHandler(event) {
      this.$refs.baseTable[event](...Array.from(arguments).slice(1))
    },
    // 暴露事件出去
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    // 处理请求参数和列表项直接的映射关系
    _proccessSortKeys(prop, column) {
      if (this.sortKeysMap) {
        // 如果是函数，则取返回值作为请求的参数
        if (_.isFunction(this.sortKeysMap)) {
          return this.sortKeysMap(prop, column)
          // 如果是对象，则取对应prop的值
        } else if (_.isObject(this.sortKeysMap)) {
          return this.sortKeysMap[prop]
        }
      } else {
        return prop
      }
    },
    /**
     * column：当前列的信息
     * prop：当前列需要排序的数据
     * order：排序的规则（升序、降序和默认[默认就是没排序]）
     */
    _onSortChange({ column, prop, order }) {
      this.emitEventHandler('sortChange', { column, prop, order })
      /**
       * 不多列排序时，需重置其他排序的参数
       */
      if (!this.mutilSort) {
        const sortList = _.keys(this.tableList)
          // 判断拥有sortable属性的table列表项
          .filter(
            (key) =>
              this.tableList[key].options &&
              !_.isUndefined(this.tableList[key].options.sortable)
          )
          // 处理获取的列表项字段
          .map((key) => this._proccessSortKeys(key, column))

        _.keys(this.listQuery).forEach((key) => {
          if (sortList.includes(key)) {
            this.listQuery[key] = null
          }
        })
      }

      if (order) {
        const queryKey = this._proccessSortKeys(prop, column)

        // 降序
        if (order === 'descending') {
          this.listQuery[queryKey] = true
          // 升序
        } else if (order === 'ascending') {
          this.listQuery[queryKey] = false
        }
      }

      this.$nextTick(() => {
        this.$emit('handleSortChange', { column, prop, order })
      })
    },
    // 为单元格添加calssName
    setCellClassName({ row, column, rowIndex, columnIndex }) {
      if (this.dragRow && columnIndex === 0) {
        return 'drag-module'
      }
    },
    // 行拖拽
    _bindRowDrop() {
      const el = document.querySelector(
        '.el-table__body-wrapper > table > tbody'
      )
      const _this = this

      Sortable.create(el, {
        handle: '.drag-module',
        onEnd: async ({ newIndex, oldIndex }) => {
          try {
            const currRow = _this.list.splice(oldIndex, 1)
            _this.list.splice(newIndex, 0, ...currRow)
            await _this.$emit('handleOnDropByRow', [..._this.list])
          } catch (error) {
            console.log.error('handleOnDropByRow: ', error)
            const oldRow = _this.list.splice(newIndex, 1)
            _this.list.splice(oldIndex, 0, oldRow)
          }
        },
      })
    },
    // 列拖拽
    _bindColumnDrop() {
      const el = document.querySelectorAll(
        '.el-table__header-wrapper > table > thead > tr'
      )
      const _this = this

      this.sortable = Sortable.create(el, {
        onEnd: async ({ newIndex, oldIndex }) => {
          const currCol = _this.tableList.splice(oldIndex, 1)
          _this.tableList.splice(newIndex, 0, ...currCol)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ {
  .drag-module {
    cursor: move;
  }
}
</style>
