
// 利用消息定于模式来进行组件之间的数据通信

// 利用 $children  $parent 之间的关系




function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName; // 组件名

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}


// 作为mixin 混入到组件中

export default {
  methods: {

    // 根基componetName去找对应的上层组件，触发事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },

    // 根据 componentName 去找 后代组件，触发事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
