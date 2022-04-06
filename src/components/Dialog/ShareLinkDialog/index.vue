<template>
  <view-dialog
    ref="shareLinkDialog"
    title="预览地址"
  >
    <el-table
      :data="linkList"
      style="width: 100%"
    >
      <el-table-column
        prop="label"
        label="链接名称"
        width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="url"
        label="链接地址"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            class="text-wrap"
            :href="scope.row.url"
            target="_blank"
          >{{scope.row.url}}</el-link>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="链接地址"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="handleCopy(scope.row.url)"
          >复制</el-button>
        </template>
      </el-table-column>
    </el-table>
  </view-dialog>
</template>

<script>
import { getShareLinkMap } from './data/share-link-map'

import ViewDialog from '../ViewDialog'

export default {
  name: 'ShareLinkDialog',
  components: {
    ViewDialog
  },
  props: {
    // 分享链接类型
    type: {
      type: String,
      default: ''
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      projectType: this.type,
      projectId: this.id
    }
  },
  computed: {
    listMap() {
      return getShareLinkMap(this.projectId)
    },
    linkList() {
      return this.projectType ? this.listMap[this.projectType] : []
    }
  },
  mounted() {},
  methods: {
    showDialog(type, id) {
      this.projectId = id
      this.projectType = type
      this.$refs.shareLinkDialog.showModal()
    },
    handleCopy: async function(url) {
      await this.$copyText(url)
      this.$message.success('分享链接已复制')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
