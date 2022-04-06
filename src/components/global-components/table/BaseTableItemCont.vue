<template>
  <div>
    <template v-if="tableItem.type === 'expand'">
      <div class="box-lg-980 box-md-750">
        <el-form
          label-position="left"
          size="mini"
          label-width="100px"
          @submit.native.prevent
        >
          <el-row :gutter="10">
            <el-col
              v-for="(tItem, key) in expandList"
              :key="key"
              :md="24"
              :lg="12"
            >
              <el-form-item :label="tItem.label">
                <base-table-item-cont
                  :table-key="key"
                  :table-item="tItem"
                  :item="item"
                  :expand-list="expandList"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>

    <!-- 如果是标签类型 -->
    <template v-else-if="tableItem.type === 'tag'">
      <template v-if="tableItem.filter">
        <el-tag
          v-if="item[tableKey] !== undefined && item[tableKey] !== null"
          :type="getFilterData(item[tableKey], 'class')"
        >{{ getFilterData(item[tableKey]) }}</el-tag>
        <span v-else>-</span>
      </template>
      <template v-else>
        <el-tag type="primary">{{ item[tableKey] || '-' }}</el-tag>
      </template>
    </template>

    <!-- 如果是html格式的字符串，解析html内容 -->
    <template v-else-if="tableItem.type === 'editor'">
      <base-editor-content :html="item[tableKey]" />
    </template>

    <template v-else-if="tableItem.type === 'normal'">
      <!-- 判断有无filter -->
      <template v-if="tableItem.filter">
        <span>{{ getFilterData(item[tableKey], ...tableItem.filterParams) }}</span>
      </template>
      <template v-else>
        <span>{{ item[tableKey] || '-' }}</span>
      </template>
    </template>

    <template v-else-if="tableItem.type === 'blank'">
      <slot
        name="blank"
        :cItem="item"
        :cKey="tableKey"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseTableItemCont',
  components: {},
  props: {
    tableKey: {
      type: String,
      default: '',
    },
    tableItem: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: () => {},
    },
    expandList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    getResultFilterData(status, type = 'label') {
      return (
        this.tableItem.filter &&
        this.tableItem.filter[status] &&
        this.tableItem.filter[status][type]
      )
    },
    getFilterData(...params) {
      if (_.isObject(this.tableItem.filter)) {
        return this.getResultFilterData(...params)
      } else {
        return this.$root.$options.filters[this.tableItem.filter](...params)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
