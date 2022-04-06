<template>
  <el-dialog title="JSON" :visible.sync="dialogVisible">
    <JsonEditor :value="value" />
  </el-dialog>
</template>
<script>
import JsonEditor from '@/components/JsonEditor';

export default {
  name: 'CodeDialog',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: { JsonEditor },
  data() {
    return {
      dialogVisible: false,
      codeValue: ''
    };
  },
  mounted() {
    // 初始化
  },
  methods: {
    open() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .json-editor {
  .cm-s-rubyblue.CodeMirror {
    background:#38566f;
  }
  .cm-s-rubyblue .CodeMirror-gutters {
    background: #2c465b;
    border-right: 7px solid #2c465b;
  }
}
</style>
