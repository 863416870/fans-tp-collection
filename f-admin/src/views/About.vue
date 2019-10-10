<template>
  <div class="about">
    <h1>This is an about page</h1>
    <icon-svg  icon-class="dust" style="width: 1000px;height: 1000px;"/>
    <icon-svg  icon-class="device" style="width: 80px;height: 80px;"/>
  </div>
</template>
<script>
  import IconSvg from '@/components/SvgIcon'
  export default {
    name: 'about',
    components: {
      IconSvg
    }
  }
</script>
