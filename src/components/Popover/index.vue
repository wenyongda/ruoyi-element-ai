<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { onClickOutside } from '@vueuse/core';

type PopoverPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

type Offset = [number, number];
const props = withDefaults(defineProps<PopoverProps>(), {
  position: 'bottom',
  offset: () => [8, 8],
  boundary: 'viewport',
  closeOnContentClick: false,
  closeOnTriggerClick: false,
  triggerStyle: () => ({}),
  popoverStyle: () => ({}),
  popoverClass: '',
});
const emits = defineEmits<{
  (e: 'show'): void;
  (e: 'hide'): void;
  (e: 'positionChange', pos: PopoverPosition): void;
}>();

const VIEWPORT_PADDING = 16;

interface PopoverProps {
  position?: PopoverPosition;
  offset?: Offset;
  triggerStyle?: CSSProperties;
  popoverStyle?: CSSProperties;
  popoverClass?: string;
  boundary?: 'viewport' | HTMLElement;
  closeOnContentClick?: boolean;
  closeOnTriggerClick?: boolean;
}

const triggerRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);
const showPoperContent = ref(false);
const currentPosition = ref<PopoverPosition>(props.position);

// 新增：动画前钩子触发位置计算
function beforeEnter() {
  updatePosition();
}

function getBoundaryRect() {
  if (props.boundary === 'viewport') {
    return {
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };
  }
  return (props.boundary as HTMLElement).getBoundingClientRect();
}

function calculatePosition(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  position: PopoverPosition,
): { top: number; left: number; origin: string } {
  const [offsetX, offsetY] = props.offset!; // 解构X/Y两个方向的偏移量
  const { width: tWidth, height: tHeight } = triggerRect;
  const { width: pWidth, height: pHeight } = popoverRect;

  const positionMap: Record<PopoverPosition, { top: number; left: number; origin: string }> = {
    // 上下方向位置（top/bottom系列）：Y轴用offsetY，X轴用offsetX
    'top': {
      top: triggerRect.top - pHeight - offsetY, // Y轴：触发元素顶部到弹框底部的距离 - Y偏移
      left: triggerRect.left + tWidth / 2 - pWidth / 2 + offsetX, // X轴：水平居中 + X偏移
      origin: 'bottom center',
    },
    'top-start': {
      top: triggerRect.top - pHeight - offsetY,
      left: triggerRect.left + offsetX, // X轴：触发元素左侧 + X偏移
      origin: 'bottom left',
    },
    'top-end': {
      top: triggerRect.top - pHeight - offsetY,
      left: triggerRect.left + tWidth - pWidth + offsetX, // X轴：触发元素右侧 - 弹框宽度 + X偏移
      origin: 'bottom right',
    },
    'bottom': {
      top: triggerRect.bottom + offsetY, // Y轴：触发元素底部 + Y偏移
      left: triggerRect.left + tWidth / 2 - pWidth / 2 + offsetX, // X轴：水平居中 + X偏移
      origin: 'top center',
    },
    'bottom-start': {
      top: triggerRect.bottom + offsetY,
      left: triggerRect.left + offsetX, // X轴：触发元素左侧 + X偏移
      origin: 'top left',
    },
    'bottom-end': {
      top: triggerRect.bottom + offsetY,
      left: triggerRect.left + tWidth - pWidth + offsetX, // X轴：触发元素右侧 - 弹框宽度 + X偏移
      origin: 'top right',
    },

    // 左右方向位置（left/right系列）：X轴用offsetX，Y轴用offsetY
    'left': {
      top: triggerRect.top + tHeight / 2 - pHeight / 2 + offsetY, // Y轴：垂直居中 + Y偏移
      left: triggerRect.left - pWidth - offsetX, // X轴：触发元素左侧 - 弹框宽度 - X偏移
      origin: 'right center',
    },
    'left-start': {
      top: triggerRect.top + offsetY, // Y轴：触发元素顶部 + Y偏移
      left: triggerRect.left - pWidth - offsetX,
      origin: 'right top',
    },
    'left-end': {
      top: triggerRect.top + tHeight - pHeight + offsetY, // Y轴：触发元素底部 - 弹框高度 + Y偏移
      left: triggerRect.left - pWidth - offsetX,
      origin: 'right bottom',
    },
    'right': {
      top: triggerRect.top + tHeight / 2 - pHeight / 2 + offsetY, // Y轴：垂直居中 + Y偏移
      left: triggerRect.right + offsetX, // X轴：触发元素右侧 + X偏移
      origin: 'left center',
    },
    'right-start': {
      top: triggerRect.top + offsetY, // Y轴：触发元素顶部 + Y偏移
      left: triggerRect.right + offsetX,
      origin: 'left top',
    },
    'right-end': {
      top: triggerRect.top + tHeight - pHeight + offsetY, // Y轴：触发元素底部 - 弹框高度 + Y偏移
      left: triggerRect.right + offsetX,
      origin: 'left bottom',
    },
  };

  return positionMap[position];
}

function adjustPosition(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  boundaryRect: DOMRect,
): PopoverPosition {
  const allPositions: PopoverPosition[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
  ];

  const candidatePositions = [props.position, ...allPositions.filter(p => p !== props.position)];

  for (const pos of candidatePositions) {
    const { top, left } = calculatePosition(triggerRect, popoverRect, pos);
    if (
      top >= boundaryRect.top + VIEWPORT_PADDING
      && left >= boundaryRect.left + VIEWPORT_PADDING
      && top + popoverRect.height <= boundaryRect.bottom - VIEWPORT_PADDING
      && left + popoverRect.width <= boundaryRect.right - VIEWPORT_PADDING
    ) {
      return pos;
    }
  }

  return props.position;
}

function updatePosition() {
  if (!triggerRef.value || !popoverRef.value)
    return;

  // 强制获取最新尺寸（避免缓存）
  const triggerRect = triggerRef.value.getBoundingClientRect();
  const popoverRect = popoverRef.value.getBoundingClientRect();
  const boundaryRect = getBoundaryRect();

  const adjustedPos = adjustPosition(triggerRect, popoverRect, boundaryRect);
  currentPosition.value = adjustedPos;
  emits('positionChange', adjustedPos);

  const { top, left, origin } = calculatePosition(triggerRect, popoverRect, adjustedPos);
  popoverRef.value.style.top = `${top}px`;
  popoverRef.value.style.left = `${left}px`;
  popoverRef.value.style.transformOrigin = origin;
}

watch(
  [() => showPoperContent.value, () => props.position],
  async ([newShow]) => {
    if (newShow) {
      // 等待弹框元素渲染完成
      await nextTick();
      updatePosition(); // 直接调用，无需 requestAnimationFrame
    }
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener('resize', updatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition);
});

function handleTriggerClick() {
  if (showPoperContent.value) {
    if (props.closeOnTriggerClick)
      hidePopover();
  }
  else {
    showPoperContent.value = true;
    nextTick(() => emits('show'));
  }
}

function handleContentClick(e: MouseEvent) {
  if (props.closeOnContentClick)
    hidePopover();
  e.stopPropagation();
}

function hidePopover() {
  showPoperContent.value = false;
  emits('hide');
}

onClickOutside(popoverRef, () => !props.closeOnTriggerClick && hidePopover(), {
  ignore: [triggerRef],
});

defineExpose({
  show: () => (showPoperContent.value = true),
  hide: hidePopover,
});
</script>

<template>
  <div
    ref="triggerRef"
    :style="props.triggerStyle"
    role="button"
    aria-haspopup="true"
    :aria-expanded="showPoperContent"
    @click.stop="handleTriggerClick"
  >
    <slot name="trigger" />
  </div>

  <Teleport to="body">
    <Transition name="popover-fade" @before-enter="beforeEnter">
      <div
        v-if="showPoperContent"
        ref="popoverRef"
        class="popover-content"
        :style="props.popoverStyle"
        :class="[props.popoverClass]"
        role="dialog"
        aria-modal="false"
        :data-popper-placement="currentPosition"
        @click="handleContentClick"
      >
        <slot name="header" />
        <slot />
        <slot name="footer" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
/* 动画样式保持不变 */
.popover-fade-enter-active,
.popover-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  will-change: transform, opacity;
}

.popover-fade-enter-from,
.popover-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.popover-fade-enter-to,
.popover-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.popover-content {
  position: fixed;
  min-width: 120px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }

  [data-popper-placement^="top"]::before {
    top: 100%;
    border-top-color: #e5e7eb;
  }

  [data-popper-placement="top"]::before {
    left: 50%;
    transform: translateX(-50%);
  }

  [data-popper-placement="top-start"]::before {
    left: 16px;
  }

  [data-popper-placement="top-end"]::before {
    right: 16px;
  }

  [data-popper-placement^="bottom"]::before {
    bottom: 100%;
    border-bottom-color: #e5e7eb;
  }

  [data-popper-placement="bottom"]::before {
    left: 50%;
    transform: translateX(-50%);
  }

  [data-popper-placement="bottom-start"]::before {
    left: 16px;
  }

  [data-popper-placement="bottom-end"]::before {
    right: 16px;
  }

  [data-popper-placement^="left"]::before {
    left: 100%;
    border-left-color: #e5e7eb;
  }

  [data-popper-placement="left"]::before {
    top: 50%;
    transform: translateY(-50%);
  }

  [data-popper-placement="left-start"]::before {
    top: 16px;
  }

  [data-popper-placement="left-end"]::before {
    bottom: 16px;
  }

  [data-popper-placement^="right"]::before {
    right: 100%;
    border-right-color: #e5e7eb;
  }

  [data-popper-placement="right"]::before {
    top: 50%;
    transform: translateY(-50%);
  }

  [data-popper-placement="right-start"]::before {
    top: 16px;
  }

  [data-popper-placement="right-end"]::before {
    bottom: 16px;
  }
}
</style>
