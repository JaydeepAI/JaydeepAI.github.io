import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { blogPosts } from './src/data/blogs'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

const routes = [
  '/',
  '/blog',
  '/achievements',
  ...blogPosts.map((post) => `/blog/${post.slug}`),
]

export default defineConfig({
  base: "/",
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://jaydeepai.github.io',
      outDir: 'dist',
      dynamicRoutes: routes,
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
