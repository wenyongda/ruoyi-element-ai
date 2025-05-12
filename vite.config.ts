import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";
import path from "path";

// TODO: 开发一个环境变量ts类型处理的插件
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    AutoImport({
      imports: ["vue"],
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(__dirname, "./src/auto-imports.d.ts"),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
