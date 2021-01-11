<template>
  <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
  <!-- 

    面包屑导航

   -->
</template>
<script>
  export default {
    name: 'ElBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },

    provide() {
      return {
        elBreadcrumb: this // provide 是父组件项后代组件的传值，没有数据响应式，没有双向绑定
      };
    },

    mounted() {
      const items = this.$el.querySelectorAll('.el-breadcrumb__item');
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
    }
  };
</script>
