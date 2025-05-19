import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";
import createSvgIcon from "./vite/plugins/svg-icon";
import path from "path";

// TODO: 开发一个环境变量ts类型处理的插件
// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: [
      UnoCSS(),
      vue(),
      AutoImport({
        imports: ["vue"],
        eslintrc: {
          enabled: true,
        },
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(__dirname, "./types/auto-imports.d.ts"),
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: path.resolve(__dirname, "./types/components.d.ts"),
      }),
      createSvgIcon(command === "build"),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      // css全局变量使用，@/styles/variable.scss文件
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/var.scss" as *;',
        },
      },
    },
  };
});
