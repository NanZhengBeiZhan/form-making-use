<template>
  <div
    :class="[itemType, hasIcon ? 'has-icon' : '', index > 0 ? 'm-t-10' : '']"
    class="multiple-item flex-box"
    @click="handleClickItem"
  >
    <div class="flex-cont">
      <slot />
    </div>

    <div
      v-if="hasIcon"
      class="flex-other icon-wrap"
      @click="handleClickClosed"
    >
      <i
        :class="iconClass"
        class="icon"
      />
    </div>
  </div>
</template>

<script>
const typeMap = {
  normal: {
    iconClass: 'normal',
  },
  active: {
    iconClass: 'el-icon-success',
  },
  disabled: {
    iconClass: 'el-icon-circle-check',
  },
  selected: {
    iconClass: 'el-icon-remove-outline',
  },
}

export default {
  name: 'MultipleItem',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
    itemType: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return _.keys(typeMap).includes(value)
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    iconClass: function () {
      return typeMap[this.itemType].iconClass || ''
    },
  },
  methods: {
    handleClickItem() {
      this.$emit('handleClickItem')
    },
    handleClickClosed() {
      this.$emit('handleClickClosed')
    },
  },
}
</script>

<style lang="scss" scoped>
.multiple-item {
  padding: 10px;
  border: 1px solid #ededed;
  border-radius: 3px;
  line-height: normal;

  &.has-icon {
    cursor: pointer;
  }

  &.active {
    border-color: #0084ff;

    .icon {
      color: #0084ff;
    }
  }

  &.selected {
    cursor: default;

    .icon-wrap {
      cursor: pointer;
    }
  }

  &.disabled {
    cursor: inherit;
  }
}

.icon-wrap {
  padding-left: 10px;
  padding-right: 5px;
  color: #a3a4a6;

  i {
    width: 15px;
    font-size: 17px;
  }

  .normal {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #999;
    border: 1px solid;
  }
}
</style>
