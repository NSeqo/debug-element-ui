import { hasOwn } from '@/element-ui/src/utils/util';

export function isVNode(node) {
  //  通过特定属性 判断是否是 VNODE 实例 componentOptions
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};
