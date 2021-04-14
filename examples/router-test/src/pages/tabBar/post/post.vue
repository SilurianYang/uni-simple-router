<template>
  <view></view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Post extends Vue {
  leave?: boolean

  onShow() {
    this.leave = !this.leave
    if (!this.leave) {
      uni.switchTab({ url: `/pages/tabBar/index/index?a=hello` })
    } else {
      uni.navigateTo({ url: '/post' })
    }
  }
}
</script>

<style lang="scss">
</style>
