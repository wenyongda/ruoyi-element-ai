<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import icons from './requireIcons';

const emits = defineEmits(['selected']);

const name = ref('');
const iconList = ref(icons);

function filterIcons() {
  iconList.value = JSON.parse(JSON.stringify(icons));
  if (name.value) {
    let index = 0;
    iconList.value.forEach((icons) => {
      iconList.value[index].iconList = icons.iconList.filter(item =>
        item.includes(name.value),
      );
      index++;
    });
  }
}

function selectedIcon(name: string) {
  emits('selected', name);
  document.body.click();
}
</script>

<template>
  <div class="icons-container">
    <div class="icon-body">
      <el-tabs type="border-card">
        <div class="icon-search-box">
          <el-input
            v-model="name"
            clearable
            placeholder="请输入图标名称"
            @clear="filterIcons"
            @input="filterIcons"
          >
            <template #prefix>
              <el-icon>
                <search />
              </el-icon>
            </template>
          </el-input>
        </div>
        <el-tab-pane
          v-for="classify of iconList"
          :key="classify.classifyName"
          :label="classify.classifyName"
        >
          <div class="grid-container">
            <div
              v-for="item of classify.iconList"
              :key="item"
              @click="selectedIcon(item)"
            >
              <div class="icon-item flex-center flex-col gap-3px">
                <SvgIcon :name="item" />
                <span class="icon_name text-overflow max-w-80px">{{
                  item
                }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" scoped lang="scss">
// 菜单图标选择样式
.el-popover {
  .grid-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  }
  .icon-item {
    cursor: pointer;
    padding: 0px 4px;
    margin: 3px 0 3px !important;
    width: fit-content !important;
    height: fit-content;
    text-align: center;
    font-size: 18px;
  }
  .icon-item:hover {
    box-shadow: 1px 1px 10px 0 #a1a1a1;
  }
  .el-tab-pane {
    height: 200px;
    overflow: auto;
  }
  .icon_name {
    display: none;
  }
}

// 菜单选择页面样式
.icons-container {
  .icon-body {
    padding: 10px;
  }
  .icon_name {
    display: block;
  }
  overflow: hidden;
  .grid-container {
    margin-top: 12px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .icon-item {
    padding: 16px 0;
    margin: 0 !important;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    width: 100% !important;
    text-align: center;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 4px;
  }

  .disabled {
    pointer-events: none;
  }
  .grid {
    border-top: 1px solid #eee;
  }
}
.icons-container span {
  font-size: 12px !important;
  color: #99a9bf;
}
.icons-container svg {
  font-size: 24px !important;
  color: #606266;
}
</style>
