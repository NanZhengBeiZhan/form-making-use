<template>
  <div style="height: 100%;">
    <fm-making-form ref="makingform" style="height: 100%;" preview generate-json>
      <template slot="action">
        <!-- 自定义操作区域插槽 -->
        <el-button type="text" @click="handleClear">
          <span class="font-14">
            <span>清空</span>
          </span>
        </el-button>

        <!-- <el-button type="text" @click="handleGetHtml">
          <span class="font-14">
            <span>生成代码</span>
          </span>
        </el-button> -->

        <el-button type="text" @click="handleGetJson">
          <span class="font-14">
            <span>生成JSON</span>
          </span>
        </el-button>

        <el-button type="text" @click="downJson">
          <span class="font-14">
            <span>下载JSON</span>
          </span>
        </el-button>
      </template>
    </fm-making-form>

    <code-dialog ref="codeDialog" :value="codeValue" />
  </div>
</template>
<script>
import CodeDialog from './components/CodeDialog';
export default {
  name: 'FormMaking',
  components: { CodeDialog },
  data() {
    return {
      temp: {
        formName: '表单',
        json: '',
        html: ''
      },
      codeValue: ''
    };
  },
  computed: {},
  mounted() {},
  methods: {
    downJson() {
      const fileName = this.temp.formName;
      const _res = JSON.stringify(this.$refs.makingform.getJSON());
      let blob = new Blob([_res], { type: 'text/json,charset=utf-8' });
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); //创建下载的链接

      downloadElement.href = href;
      downloadElement.download = fileName + '.json'; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href);
    },
    handleClear(){
      this.$refs.makingform.clear()
    },
    // 生成JSON
    handleGetJson() {
      this.codeValue = this.$refs.makingform.getJSON();
      this.$refs.codeDialog.open();
    },
    handleGetHtml() {
      this.codeValue = JSON.parse(this.$refs.makingform.getHtml());
      this.$refs.codeDialog.open();
    }
  }
};
</script>
<style scoped lang="less"></style>
