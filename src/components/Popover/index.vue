<!-- Popover 弹框 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { flip, offset, shift, useFloating } from '@floating-ui/vue';

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
const reference = ref();
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  placement: props.position,
  middleware: [offset(props.offset[0]), flip(), shift()],
});

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

const showPoperContent = ref(false);

function handleTriggerClick() {
  showPoperContent.value = !showPoperContent.value;
  if (showPoperContent.value) {
    emits('show');
  }
  else {
    emits('hide');
  }
}
</script>

<template>
  <div>
    <div ref="reference" :style="props.triggerStyle" @click.stop="handleTriggerClick">
      <slot name="trigger" />
    </div>

    <Transition name="popover-fade">
      <div
        v-if="showPoperContent"
        ref="floating"
        class="popover-content"
        :style="{
          ...floatingStyles,
          ...props.popoverStyle,
        }"
        :class="[props.popoverClass]"
      >
        <slot name="header" />
        <slot />
        <slot name="footer" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss"></style>
