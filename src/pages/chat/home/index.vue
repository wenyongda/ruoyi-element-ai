<!-- 对话首页 -->
<script setup lang="ts">
const senderValue = ref('');
const isSelect = ref(false);
function handleSend() {
  console.log(senderValue.value);
}
</script>

<template>
  <div class="chat-home-container">
    <div class="chat-home-wrap">
      <div class="chat-home-welecome">
        <div
          class="welecome-text min-h-45px text-center mt-0px mr-auto ml-auto mb-32px font-size-32px text-align-center font-600"
        >
          早上好，Hjy。
        </div>
      </div>
      <Sender
        v-model="senderValue"
        class="chat-home-sender"
        :auto-size="{
          maxRows: 9,
          minRows: 3,
        }"
        variant="updown"
        clearable
        allow-speech
        @submit="handleSend"
      >
        <template #prefix>
          <div class="flex-1 flex items-center gap-8px flex-none w-fit overflow-hidden">
            <div
              class="flex items-center gap-4px px-12px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
            >
              <el-icon>
                <Paperclip />
              </el-icon>
            </div>

            <div
              :class="{ isSelect }"
              class="flex items-center gap-4px px-10px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
              @click="isSelect = !isSelect"
            >
              <el-icon>
                <ElementPlus />
              </el-icon>
              <span>深度思考</span>
            </div>
          </div>
        </template>
      </Sender>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-home-container {
  padding: 0 16px;
  width: calc(100% - 32px);
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--header-container-default-heigth));

  .chat-home-wrap {
    width: 100%;
    max-width: 800px;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: antiquewhite;

    .chat-home-sender {
      width: 100%;
    }
  }
}
</style>
