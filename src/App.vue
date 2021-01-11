<template>
  <div id="app">
    <h3>element-ui</h3>
    <el-button @click="handleClick">提示弹窗</el-button>
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    handleClick() {
      this.$message({
        message:'hello,world',
        duration:0,
        showClose:true,
        type:'success'
      });
    },
  },

};
</script>

