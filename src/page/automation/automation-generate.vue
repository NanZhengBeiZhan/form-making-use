<template>
  <div class="automation-generate">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题:" prop="title">
        <el-input v-model="ruleForm.title" size="small" placeholder="请输入表单标题"></el-input>
      </el-form-item>
      <el-form-item label="JSON:" prop="JSON">
        <el-input
          v-model="ruleForm.JSON"
          type="textarea"
          size="small"
          placeholder="请输入form-making生成的JSON"
          rows="10"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <form-generate-dialog
      v-if="dialogShow"
      :dialogVisible="dialogShow"
      :dialogTitle="ruleForm.title"
      :jsonData="ruleForm.JSON"
      @handleClose="dialogShow=false"
    />
  </div>
</template>
<script>
import FormGenerateDialog from './components/FormGenerateDialog.vue'

export default {
  name: 'AutomationGenerate',
  components: { FormGenerateDialog },
  data() {
    return {
      dialogShow: false,
      ruleForm: {
        JSON: '',
        title: '',
      },
      rules: {
        title: [
          { required: true, message: '请填写表单标题', trigger: 'blur' }
        ],
        JSON: [
          { required: true, message: '请填写form-making生成的JSON', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogShow = true
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.automation-generate {
  padding-top: 50px;
  padding-right: 50px;
}
</style>