import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({

    server: {
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true
        }
    },

});
