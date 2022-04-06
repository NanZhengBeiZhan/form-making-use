<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="handleClose">
    <div class="form-generate">
      <fm-generate-form :data="parseJsonData" ref="generateForm"></fm-generate-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfim">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'FormGenerateDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '表单'
    },
    jsonData: {
      type: String,
      default: ''
    }
  },
  computed: {
    parseJsonData() {
      return JSON.parse(this.jsonData)
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    handleConfim() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          this.$alert(data, '表单数据');
        })
        .catch((e) => { });
    }
  },
};
</script>
<style scoped lang='less'>
</style>