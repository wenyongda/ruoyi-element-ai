import type { CollapseType, LayoutType } from '@/config/design';
import { defineStore } from 'pinia';
import designSetting from '@/config/design';

const {
  darkMode: reDarkMode,
  themeColor,
  themeColorList,
  isPageAnimate,
  pageAnimateType: rePageAnimateType,
  layout: reLayout,
  collapseType: reCollapseType,
  isCollapse: reisCollapse,
  isCollapseHover: reisCollapseHover,
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

    // 折叠状态
    const collapseType = ref<CollapseType>(reCollapseType);
    const setCollapseType = (type: CollapseType) => {
      collapseType.value = type;
    };

    // 最终是否展开左侧菜单
    const isCollapse = ref<boolean>(reisCollapse);

    const setCollapseFinal = (collapseFinal: boolean) => {
      isCollapse.value = collapseFinal;
    };

    // 折叠按钮是否被悬停
    const isCollapseHover = ref<boolean>(reisCollapseHover);

    const setCollapseHover = (hover: boolean) => {
      isCollapseHover.value = hover;
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
      collapseType,
      setCollapseType,
      isCollapse,
      setCollapseFinal,
      isCollapseHover,
      setCollapseHover,
    };
  },
  {
    persist: true,
  },
);
