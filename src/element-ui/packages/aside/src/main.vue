<template>
<!-- 

     aside就是一个普通的元素，作为主内容的补充说明

 -->
  <aside class="el-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'ElAside',

    componentName: 'ElAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
