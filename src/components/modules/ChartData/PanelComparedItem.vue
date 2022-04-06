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

        <div>
          <p class="font-14">
            <span>今日:</span>
            <count-to
              :start-val="0"
              :end-val="+item.todayData"
              :duration="2600"
            />
          </p>
          <p class="font-14">
            <span>昨日:</span>
            <count-to
              :start-val="0"
              :end-val="+item.yesterdayData"
              :duration="2600"
            />
          </p>

          <p
            v-if="item.currentMonthType"
            class="font-14"
          >
            <span>本月:</span>
            <count-to
              :start-val="0"
              :end-val="+item.currentMonthData"
              :duration="2600"
            />
          </p>
          <p
            v-if="item.lastMonthType"
            class="font-14"
          >
            <span>上月:</span>
            <count-to
              :start-val="0"
              :end-val="+item.lastMonthData"
              :duration="2600"
            />
          </p>
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
