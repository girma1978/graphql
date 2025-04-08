// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         secure: false,
//         changeOrigin: true
//       }
//     }
//   }
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': { // Changed from '/api' to '/graphql' (or your GraphQL endpoint)
//         target: 'http://localhost:3000', // Your GraphQL server address
//         secure: false,
//         changeOrigin: true
//       }
//     }
//   }
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,  // This ensures the frontend runs on port 3000
//     open: true,  // This automatically opens the app in the browser
//     proxy: {
//       '/graphql': {  // Proxy requests starting with /graphql to the backend
//         target: 'http://localhost:3000',  // Ensure this is the correct address of your Apollo server
//         changeOrigin: true,  // This makes sure the request appears as if it's coming from the target server
//         secure: false,  // This disables SSL verification (useful for localhost servers)
//         ws: true,  // If you're using WebSocket subscriptions with Apollo, make sure this is enabled
//       },
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Frontend on port 3000
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',  // Change this to your backend port (e.g., 4000)
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});