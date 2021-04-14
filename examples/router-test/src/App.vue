<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  onError(e: string) {
    console.warn(e)
  },
})
</script>

<style lang="scss">
page {
  width: 100%;
  height: 100%;
}
</style>
