<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { onClickOutside, useEventListener } from '@vueuse/core';

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
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let updatePositionTimeout: number | null = null;

// 初始化尺寸与内容变化监听
function initObservers() {
  if (!popoverRef.value)
    return;

  // 监听弹出框尺寸变化
  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(updatePosition);
  });
  resizeObserver.observe(popoverRef.value);

  // 监听弹出框内容变化（子节点/样式变更）
  mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        updatePosition();
      }
    }
    requestAnimationFrame(updatePosition);
  });
  mutationObserver.observe(popoverRef.value, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
}

// 销毁监听
function destroyObservers() {
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
  resizeObserver = null;
  mutationObserver = null;
}

// 强制更新定位（处理DOM缓存）
function updatePosition() {
  if (!triggerRef.value || !popoverRef.value)
    return;

  // 强制触发回流获取最新尺寸
  triggerRef.value.getBoundingClientRect();
  popoverRef.value.getBoundingClientRect();

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

// 窗口尺寸变化防抖处理
useEventListener('resize', () => {
  if (updatePositionTimeout)
    clearTimeout(updatePositionTimeout);
  updatePositionTimeout = setTimeout(updatePosition, 50);
});

// 显示/隐藏状态监听
watch(
  showPoperContent,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        initObservers();
        updatePosition();
      });
    }
    else {
      destroyObservers();
    }
  },
  { immediate: true },
);

// 边界计算（保持不变）
function getBoundaryRect(): DOMRect {
  if (props.boundary === 'viewport') {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  }
  return (props.boundary as HTMLElement).getBoundingClientRect();
}

// 定位计算（保持不变）
function calculatePosition(triggerRect: DOMRect, popoverRect: DOMRect, position: PopoverPosition) {
  const [offsetX, offsetY] = props.offset!;
  const { width: tW, height: tH } = triggerRect;
  const { width: pW, height: pH } = popoverRect;

  const positionMap: Record<PopoverPosition, { top: number; left: number; origin: string }> = {
    'top': {
      top: triggerRect.top - pH - offsetY,
      left: triggerRect.left + tW / 2 - pW / 2 + offsetX,
      origin: 'bottom center',
    },
    'top-start': {
      top: triggerRect.top - pH - offsetY,
      left: triggerRect.left + offsetX,
      origin: 'bottom left',
    },
    'top-end': {
      top: triggerRect.top - pH - offsetY,
      left: triggerRect.left + tW - pW + offsetX,
      origin: 'bottom right',
    },
    'bottom': {
      top: triggerRect.bottom + offsetY,
      left: triggerRect.left + tW / 2 - pW / 2 + offsetX,
      origin: 'top center',
    },
    'bottom-start': {
      top: triggerRect.bottom + offsetY,
      left: triggerRect.left + offsetX,
      origin: 'top left',
    },
    'bottom-end': {
      top: triggerRect.bottom + offsetY,
      left: triggerRect.left + tW - pW + offsetX,
      origin: 'top right',
    },
    'left': {
      top: triggerRect.top + tH / 2 - pH / 2 + offsetY,
      left: triggerRect.left - pW - offsetX,
      origin: 'right center',
    },
    'left-start': {
      top: triggerRect.top + offsetY,
      left: triggerRect.left - pW - offsetX,
      origin: 'right top',
    },
    'left-end': {
      top: triggerRect.top + tH - pH + offsetY,
      left: triggerRect.left - pW - offsetX,
      origin: 'right bottom',
    },
    'right': {
      top: triggerRect.top + tH / 2 - pH / 2 + offsetY,
      left: triggerRect.right + offsetX,
      origin: 'left center',
    },
    'right-start': {
      top: triggerRect.top + offsetY,
      left: triggerRect.right + offsetX,
      origin: 'left top',
    },
    'right-end': {
      top: triggerRect.top + tH - pH + offsetY,
      left: triggerRect.right + offsetX,
      origin: 'left bottom',
    },
  };
  return positionMap[position];
}

// 边界调整（保持不变）
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

// 交互逻辑（保持不变）
function handleTriggerClick() {
  if (showPoperContent.value) {
    props.closeOnTriggerClick && hidePopover();
  }
  else {
    showPoperContent.value = true;
    nextTick(() => emits('show'));
  }
}

function handleContentClick(e: MouseEvent) {
  props.closeOnContentClick && hidePopover();
  e.stopPropagation();
}

function hidePopover() {
  showPoperContent.value = false;
  emits('hide');
}

onClickOutside(popoverRef, () => !props.closeOnTriggerClick && hidePopover(), {
  ignore: [triggerRef],
});

onUnmounted(() => {
  destroyObservers();
  updatePositionTimeout && clearTimeout(updatePositionTimeout);
});

defineExpose({ show: () => (showPoperContent.value = true), hide: hidePopover });
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
    <Transition name="popover-fade" @before-enter="updatePosition">
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
