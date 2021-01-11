<template>
  <transition name="el-fade-in">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="el-backtop">
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>

  <!-- 

    backtop： 页面上右下角的返回顶部的按钮

   -->
</template>

<script>
import { throttle } from 'throttle-debounce';

const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: 'ElBacktop',

  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  data() {
    return {
      el: null,
      container: null,
      visible: false
    };
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },

  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll); // 滚动函数 - 节流处理 - 一段时间内仅仅执行一次函数
    this.container.addEventListener('scroll', this.throttledScrollHandler); // 添加滚动事件
  },

  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement; // 获取document对象的dom
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight; // 控制按钮的显示隐藏，只有页面向上滚动距离超过visibilityHeight时才显示
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500; // 500ms 内是用动画表现的
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0; // 控制页面向上滚动的距离属性 scrollTop
        }
      };
      rAF(frameFunc);
    }
  },

  beforeDestroy() {
    // 组件卸载前注意 滚动事件的卸载
    this.container.removeEventListener('scroll', this.throttledScrollHandler);
  }
};
</script>
