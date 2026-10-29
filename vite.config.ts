import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContactRequest } from './server/contact-handler.ts';

function contactApi(): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response) => {
        void handleContactRequest(request, response);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/contact', (request, response) => {
        void handleContactRequest(request, response);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [react(), contactApi()],
  };
});
