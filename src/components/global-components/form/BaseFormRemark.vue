<template>
  <div class="el-form-item__remark">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>{{ value }}</template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseFormRemark',
  components: {},
  props: {
    value: {
      type: [String],
      default: function() {
        return '请填写内容'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('app', {
      isMobile: state => state.device === 'mobile'
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-form-item__remark {
  font-size: 12px;
  color: #999 ;
  margin-top: 5px;
  margin-bottom: 10px;
  line-height: 10px;

  &::before {
    content: '*';
  }
}
</style>
