export default {
  props: {
    // 传入的已选择项
    select: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [], // 操作的列表
      curSelected: [] // 当前选择的列表
    }
  },
  methods: {
    // 对课程进行状态标记 normal disabled active
    _processListToMultipleItem(list) {
      return list.map(item => {
        item.itemType = 'normal'

        const is_disabled = this.select.some(course => course && course.id === item.id)
        if (is_disabled) {
          item.itemType = 'disabled'
        }

        const is_active = this.curSelected.some(course => course && course.id === item.id)
        if (is_active) {
          item.itemType = 'active'
        }

        return {
          ...item
        }
      })
    },
    // 点击列表项
    _handleClickItem(index, item, maxSize) {
      if (item.itemType === 'disabled') {
        return
      } else if (item.itemType === 'normal') {
        // 如果是单选
        if (!this.multiple) {
          this.list.forEach(i => {
            if (i.itemType === 'active') {
              i.itemType = 'normal'
            }
          })
          this.curSelected = []
        }
        item.itemType = 'active'
        // 添加到选中课程中
        const selected_item = Object.assign({}, item)
        selected_item.itemType = 'selected'
        if (maxSize && this.curSelected.length === Number(maxSize)) {
          this.$message.warning(`最大可添加${maxSize}个项目`)
          return
        } else {
          this.curSelected.push(selected_item)
        }
      } else if (item.itemType === 'active') {
        item.itemType = 'normal'
        // 从选中课程中移除
        const selected_index = _.findIndex(
          this.curSelected,
          o => o.id === item.id
        )
        if (selected_index >= 0) {
          this.curSelected.splice(selected_index, 1)
        }
      }
    },
    // 点击选中项的图标
    _handleClickSelectedClosed(index) {
      // 从选中课程中移除
      const item = this.curSelected[index]
      const active_index = _.findIndex(this.list, o => o.id === item.id)
      if (active_index >= 0) {
        this.list[active_index].itemType = 'normal'
      }

      this.curSelected.splice(index, 1)
    }
  }
}