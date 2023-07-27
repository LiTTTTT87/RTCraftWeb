import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [vue()],
})
=======
  server:{
    host: '0.0.0.0',
 },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
})
>>>>>>> 9ca12173c616f1bee61b26b7fe91f67afee72ee2
