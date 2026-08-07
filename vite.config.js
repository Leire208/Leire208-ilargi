import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      injectRegister: "auto",

      includeAssets: [

        "favicon.ico"

      ],

      manifest: {

        name: "Ilargi",

        short_name: "Ilargi",

        description: "Planificador universitario",

        theme_color: "#0f172a",

        background_color: "#0f172a",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        scope: "/",

        icons: [

          {

            src: "/icons/icon-192.png",

            sizes: "192x192",

            type: "image/png"

          },

          {

            src: "/icons/icon-512.png",

            sizes: "512x512",

            type: "image/png"

          },

          {

            src: "/icons/icon-512-maskable.png",

            sizes: "512x512",

            type: "image/png",

            purpose: "maskable"

          }

        ]

      }

    })

  ]

});