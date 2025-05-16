import type { LayoutType } from '@/config/design';
import { defineStore } from 'pinia';
import designSetting from '@/config/design';

const {
  darkMode: reDarkMode,
  themeColor,
  themeColorList,
  isPageAnimate,
  pageAnimateType: rePageAnimateType,
  layout: reLayout,
  isCollapse: reIsCollapse,
  isCollapseManual: reIsCollapseManual,
  isCollapseFinal: reIsCollapseFinal,
} = designSetting;

export const useDesignStore = defineStore(
  'design',
  () => {
    const darkMode = ref(reDarkMode);
    const setDarkMode = (modeType: 'light' | 'dark' | 'inverted') => {
      darkMode.value = modeType;
    };

    const pageAnimateType = ref(rePageAnimateType);

    const setPageAnimateType = (type: string) => {
      pageAnimateType.value = type;
    };

    const layout = ref<LayoutType>(reLayout);

    // 当前只有一个布局，暂时不将这个方法暴露出去
    // const _setLayout = (layoutType: 'vertical') => {
    //   layout.value = layoutType;
    // };

    // 更据视口宽度和阈值-是否展开左侧菜单
    const isCollapse = ref<boolean>(reIsCollapse);
    const setCollapse = (collapse: boolean) => {
      isCollapse.value = collapse;
    };

    // 是否手动点击展开左侧菜单
    const isCollapseManual = ref<boolean>(reIsCollapseManual);
    const setCollapseManual = (collapseManual: boolean): boolean => {
      isCollapseManual.value = collapseManual;
      return collapseManual;
    };

    // 最终是否展开左侧菜单
    const isCollapseFinal = ref<boolean>(reIsCollapseFinal);

    const setCollapseFinal = (collapseFinal: boolean) => {
      console.log('最终的折叠状态', collapseFinal);
      isCollapseFinal.value = collapseFinal;
    };

    return {
      darkMode,
      setDarkMode,
      themeColor: ref(themeColor),
      themeColorList: ref(themeColorList),
      isPageAnimate: ref(isPageAnimate),
      pageAnimateType,
      setPageAnimateType,
      layout,
      isCollapse,
      setCollapse,
      isCollapseManual,
      setCollapseManual,
      isCollapseFinal,
      setCollapseFinal,
    };
  },
  {
    persist: true,
  },
);
