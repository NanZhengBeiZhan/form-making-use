<template>
  <div class="base-form-container">
    <fm-generate-form
      ref="generateForm"
      insite="true"
      :data="jsonData"
      :value="formData"
      v-bind="$attrs"
      @on-change="_handleDataChange"
      v-on="$listeners"
    >
      <template v-for="(key, bIndex) in blankOptions" v-slot:[key]="scope">
        <!-- 编辑器 -->
        <div :key="_getElementKey(key, bIndex)">
          <template v-if="data.blank[key].type === 'IMAGE'">
            <el-button type="primary">上传图片</el-button>
          </template>

          <!-- 自定义插槽 -->
          <template v-if="data.blank[key].type === 'SLOT'">
            <component :is="data.blank[key].componentName" :list="scope.model[key]"></component>
          </template>

          <template v-if="data.blank[key].type ==='FILE'">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="data.blank[key].fileList"
              v-on="data.blank[key].bindEvent"
              v-bind="data.blank[key].bindAttr"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>

          <template v-if="data.blank[key].type === 'TIP'">
            <base-form-remark :value="data.blank[key].tipMessage" class="form-tip-cont" />
          </template>
        </div>
      </template>
    </fm-generate-form>
  </div>
</template>
<script>
const _ = require('lodash');

export default {
  name: 'BaseForm',
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  components: {},
  data() {
    return {
      jsonData: {
        config: {},
        list: []
      },
      formData: {},
    };
  },
  computed: {
    blankOptions() {
      return _.keys(this.data.blank);
    },
    logicOptions() {
      return _.keys(this.data.logic)
    },
    logicFormListObj() {
      const result = {}
      if (this.logicOptions) {
        this.logicOptions.forEach((key) => {
          const obj = {}

          _.keys(this.data.logic[key]).forEach((item) => {
            if (this.data.logic[key][item]) {
              const { list } = JSON.parse(this.data.logic[key][item])
              obj[item] = list
            }
          })

          result[key] = obj
        })
      }

      return result
    },
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this._initData();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 初始化表单数据
    _initData() {
      this.formData = {};
      if (!_.isEmpty(this.data)) {
        this.jsonData = JSON.parse(this.data.jsonData)

        // 初始化formData
        this.formData = this.data.defaultData
      }
    },
    // 表单项值改变时触发
    _handleDataChange(field, value, data) {
      console.log('onChangeData值更新：', field, value, data);
      this.$set(this.formData, field, value);
      this.$emit(`on-${_.kebabCase(field)}-change`, value, data);
      this._updateLogicChange(field, value)
    },
    // 根据当前值的变化，动态改变logicJsonData
    _updateLogicChange(key, value) {
      if (this.logicFormListObj[key]) {
        // 先初始化
        _.keys(this.logicFormListObj[key]).forEach(logicKey => {
          this.jsonData.list = this.jsonData.list.filter(item => !this.logicFormListObj[key][logicKey].some(newItem => item.model === newItem.model))
        })
        let _newFormList
        if (this.logicFormListObj[key][value]) {
          // 添加
          _newFormList = [...this.jsonData.list, ...this.logicFormListObj[key][value]]
        } else {
          _newFormList = this.jsonData.list
        }
        this.$set(this.jsonData, 'list', _newFormList)
        this.$set(this.data, 'jsonData', JSON.stringify(this.jsonData))
      }

    },

    // 获取表单项的key值
    _getElementKey(key, index) {
      return `${key}-${index}`;
    },
    // 提交表单并返回表单内容
    async submitForm() {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await this.validateForm();
          this.$emit('handleConfirm', {
            formData: this.formData
          });
          resolve(data);
        } catch (error) {
          console.error('baserForm/submitForm', error);
          reject(error);
        }
      });
    },
    // 验证表单
    validateForm() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.$refs.generateForm.getData()
          const formData = _.assign({}, res)
          // 数据获取成功
          console.log('baserForm/validateForm: ', formData)
          const data = _.pick(formData, this.data.params)
          resolve(data)
        } catch (error) {
          console.error('baserForm/validateForm', error)
          reject(error)
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.m-t {
  margin-top: 15px;
}
.base-form-container {
  /deep/ {
    .form-tip-cont {
      margin-top: -8px;
      margin-bottom: 0;
    }
  }
}
</style>