<template>
  <div class="padder-md">
    <base-form
      ref="BaseForm"
      :data="formData"
      :remote="remoteFuncs"
      @handleConfirm="handleConfirm"
      @on-original-price-change="onOriginalPriceChage"
      @on-discount-change="onDiscountChage"
    />

    <div class="card-footer">
      <div class="box box-lg-680 text-center">
        <el-button type="primary" @click="handleSubmitForm">保存</el-button>
        <el-button type="primary" plain>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>

const _ = require('lodash');
const goodsClassifyList = [{ label: '蔬菜', value: 'VEGET' }, { label: '水果', value: 'FRUIT' }]
const temp = {
  goodsClassify: '',
  id: null,
  title: '',
  originalPrice: 0,
  discount: 0,
  detail: '',
  file: '',
  price: 0,
  state: false,
  shelfTime: +new Date(),
}
export default {
  name: 'GoodsForm',
  data() {
    return {
      formData: {
        defaultData: _.cloneDeep(temp),
        data: _.keys(temp),
        blank: {
          discount_tip: {
            type: 'TIP',
            tipMessage: '现价 = 原价*折扣/10'
          },
          details_tip: {
            type: 'TIP',
            tipMessage: '这是一个提示'
          },
        },
        logic: {
          state: {
            false: null,
            true:
              '{"list":[{"type":"date","icon":"icon-date","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"datetime","format":"yyyy-MM-dd HH:mm","timestamp":true,"required":true,"width":"","remoteFunc":"func_1648791231000_42135"},"name":"上架时间","key":"1648791231000_42135","model":"shelfTime","rules":[{"required":true,"message":"上架时间必须填写"}]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":""}}',
          },
        },
        jsonData:
          '{"list":[{"type":"radio","icon":"icon-radio-active","options":{"inline":true,"defaultValue":"VEGET","showLabel":true,"options":[{"value":"VEGET","label":"蔬菜"},{"value":"FRUIT","label":"水果"}],"required":true,"width":"50%","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"getGoodsClassify","disabled":false},"name":"商品类型","key":"1648782515000_72689","model":"goodsClassify","rules":[{"required":true,"message":"商品类型必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"50%","defaultValue":"","required":true,"dataType":"string","pattern":"","placeholder":"请输入商品标题","disabled":false,"remoteFunc":"func_1604650558000_66703"},"name":"商品名称","key":"1604650558000_66703","model":"title","rules":[{"type":"string","message":"商品名称格式不正确"},{"required":true,"message":"商品名称必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"50%","defaultValue":"","required":true,"dataType":"number","pattern":"","placeholder":"请输入原价","disabled":false,"remoteFunc":"func_1604650901000_19155"},"name":"原价","key":"1648707643000_59299","model":"originalPrice","rules":[{"type":"number","message":"原价格式不正确"},{"required":true,"message":"原价必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"50%","defaultValue":"","required":true,"dataType":"number","pattern":"","placeholder":"请输入折扣","disabled":false,"remoteFunc":"func_1604650901000_19155"},"name":"折扣","key":"1604650901000_19155","model":"discount","rules":[{"type":"number","message":"折扣格式不正确"},{"required":true,"message":"折扣必须填写"}]},{"type":"blank","icon":"icon-zidingyishuju","options":{"defaultType":"String","remoteFunc":"func_1648712111000_24545"},"name":"","key":"1648712111000_24545","model":"discount_tip","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"50%","defaultValue":"","required":false,"dataType":"number","pattern":"","placeholder":"","disabled":true,"remoteFunc":"func_1648708153000_18232"},"name":"现价","key":"1648708153000_18232","model":"price","rules":[{"type":"number","message":"现价格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"50%","defaultValue":"","required":true,"disabled":false,"pattern":"","placeholder":"请输入测评简介","remoteFunc":"func_1604650575000_10613"},"name":"简介","key":"1604650575000_10613","model":"description","rules":[{"required":true,"message":"简介必须填写"}]},{"type":"editor","icon":"icon-fuwenbenkuang","options":{"defaultValue":"","width":"80%","remoteFunc":"func_1648708710000_57297"},"name":"详情","key":"1648708710000_57297","model":"detail","rules":[]},{"type":"blank","icon":"icon-zidingyishuju","options":{"defaultType":"String","remoteFunc":"func_1604651324000_79003"},"name":"","key":"1604651324000_79003","model":"details_tip","rules":[]},{"type":"switch","icon":"icon-switch","options":{"defaultValue":false,"required":false,"disabled":false,"remoteFunc":"func_1604651518000_29019"},"name":"是否上架","key":"1604651518000_29019","model":"state","rules":[]}],"config":{"labelWidth":130,"labelPosition":"right","size":"small"}}',
      },
      remoteFuncs: {
        getGoodsClassify(resolve) {
          const list = _.cloneDeep(goodsClassifyList)
          resolve(list)
        },
      },

    };
  },
  mounted() {
  },
  methods: {
    onOriginalPriceChage(value, data) {
      this.formData.defaultData.price = data.originalPrice * data.discount / 10
    },
    onDiscountChage(value, data) {
      this.formData.defaultData.price = data.originalPrice * data.discount / 10
    },
    handleSubmitForm() {
      this.$refs['BaseForm'].submitForm()
    },
    handleConfirm(data) {
      this.$alert(data, '表单数据');
    }
  },
};
</script>
<style scoped lang='less'>
.padder-md {
  padding: 20px;
}
.card-footer {
  text-align: right;
  padding-right: 15px;
  padding-top: 15px;
}
</style>