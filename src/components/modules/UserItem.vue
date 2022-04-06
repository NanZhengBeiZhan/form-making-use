<template>
  <multiple-item
    :index="index"
    :item-type="item.itemType"
    :has-icon="hasIcon"
    @handleClickItem="$emit('handleClickItem', index, item)"
    @handleClickClosed="$emit('handleClickClosed',index, item)"
  >
    <div class="flex-other">
      <div class="img-wrap flex-other">
        <img :src="headImg" class="img" />
      </div>
    </div>

    <div class="flex-cont flex-col p-l-10">
      <div class="font-13 text-ellipsis-1 m-b-3">{{ item.nickname||item.username }}</div>
      <div class="font-12 text-ellipsis-1 text-muted">{{ item.roleNames }}</div>
    </div>
  </multiple-item>
</template>

<script>
import MultipleItem from '@/components/modules/multiple/MultipleItem'

export default {
  name: 'UserItem',
  components: { MultipleItem },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      },
    },
    index: {
      type: Number,
      default: 0,
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    headImg() {
      return this.item.headImg || _datas.images.boyPhone
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.img-wrap {
  width: 48px;
  height: 48px;
}

.img {
  width: 48px;
  height: 48px;
}
</style>
