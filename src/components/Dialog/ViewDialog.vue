<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      append-to-body
      :class="[
        size === 'small' ? 'el-dialog-sm' : '',
        size === 'big' ? 'el-dialog-lg' : '',
      ]"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="showCancel"
          v-waves
          @click="visible = false"
        >取 消</el-button>

        <el-button
          v-waves
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ViewDialog',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {},
  methods: {
    handleConfirm() {
      this.$emit('handleConfirm')
      this.closeModal()
    },
    closeModal() {
      this.visible = false
    },
    showModal(params) {
      this.visible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
