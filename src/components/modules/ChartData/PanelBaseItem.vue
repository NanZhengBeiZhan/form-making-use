<template>
  <div class="card-panel flex-row">
    <div
      :class="item.type"
      class="card-panel-icon-wrapper flex-other p-r-12"
    >
      <i
        :class="[item.iconName,iconColor(item.iconColor)]"
        class="font-28"
      />
    </div>
    <div class="card-panel-description flex-cont">
      <div class="flex-body">
        <div class="font-15 font-bold m-b-10">{{item.label}}</div>

        <div v-if="item.scenes==='active'">
          <div>
            <p class="font-14">
              <span>周活:</span>
              <span>{{(item.weekQuantity)}}</span>
            </p>
            <p class="font-14">
              <span>月活:</span>
              <span>{{(item.mouthQuantity)}}</span>
            </p>
          </div>
        </div>

        <div v-else>
          <count-to
            :start-val="0"
            :end-val="+item.quantity"
            :duration="2600"
            class="card-panel-num font-16 font-bold"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'PanelBaseItem',
  components: { CountTo },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},

  methods: {
    iconColor(val) {
      return `text-${val}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
