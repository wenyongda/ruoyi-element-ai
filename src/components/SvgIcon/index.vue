<script setup lang="ts">
const props = defineProps<{
  className?: string;
  name: string;
  color?: string;
  size?: string;
}>();

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ fontSize: size }">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scope lang="scss">
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
