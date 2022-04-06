<template>
  <div>
    <el-dialog
      title="批量导入学员"
      :visible.sync="visible"
      append-to-body
    >
      <el-alert
        show-icon
        type="info"
        class="m-b"
      >
        <p slot="title">操作提示：</p>

        <ul class="decimal m-v-10 text-muted font-13">
          <li>
            <span>导入前可以先下载模板,</span>
            <el-link
              type="primary"
              @click="handleDownload"
            >点击下载</el-link>
          </li>
        </ul>
      </el-alert>
      <el-form
        ref="form"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="上传文件:">
          <el-upload
            ref="classStudentUpload"
            :action="actionUrl"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            :before-upload="handleBeforeUpload"
            :http-request="handleUpload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-remove="handleRemove"
            class="import_box-upload"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传 xls / xlsx 文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
      </el-form>
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
          :loading="confirmLoading"
          type="primary"
          @click="submitUpload"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { downloadClassStudentTemplate } from '@/api/class'
import baseUrl from '@/utils/config-url'

export default {
  name: 'BatchStudentUploadDialog',
  components: {},
  props: {
    requestUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      name: 'CommentEditForm',
      visible: false,
      itemId: '',

      fileList: [],
      confirmLoading: false,
    }
  },
  computed: {
    actionUrl() {
      return `${baseUrl}/${this.requestUrl}`
    },
  },
  mounted() {},
  methods: {
    async handleCreate(id) {
      this.visible = true
      this.fileList = []
      if (id) {
        this.itemId = id
      } else {
        this.$nextTick(async () => {
          await this.$refs[this.name].resetForm()
        })
      }
    },
    async handleBeforeUpload(file) {
      return new Promise((resolve, reject) => {
        this.confirmLoading = true
        const fileNams = file.name.split('.')
        const fileTypeName = fileNams[fileNams.length - 1]
        const isExcel = fileTypeName === 'xls' || fileTypeName === 'xlsx'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isExcel) {
          this.$message.warning('上传文件只能是 xls/xlsx 格式!')
          this.confirmLoading = false
          reject()
        } else if (!isLt1M) {
          this.$message.warning('上传文件大小不能超过1MB!')
          this.confirmLoading = false
          reject()
        }
        resolve()
      })
    },
    // 开始上传
    async handleUpload(content) {
      return new Promise(async (resolve, reject) => {
        try {
          const { file } = content
          const params = new FormData() // 创建form对象
          params.append('file', file, file.name)
          this.$emit('handleUpload', this.itemId, params)
          resolve(true)
        } catch (error) {
          console.log.error('upload/batchImport/handleUpload: ', error)
          reject(error)
        }
      })
    },

    // 上传成功时
    handleSuccess(response, file, fileList) {
      this.confirmLoading = false
      this.visible = false
      this.$message.success('上传成功!')
    },
    submitUpload() {
      this.$refs.classStudentUpload.submit()
    },
    handleError() {
      this.confirmLoading = false
      this.$message.error('上传失败!')
    },
    handleRemove() {
      this.fileList = []
    },
    async handleDownload() {
      try {
        await downloadClassStudentTemplate()
      } catch (error) {
        console.log.error('class/data: downloadClassStudentTemplate', error)
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
