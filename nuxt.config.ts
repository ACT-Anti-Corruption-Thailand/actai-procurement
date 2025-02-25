// https://nuxt.com/docs/api/configuration/nuxt-config
const BASE_URL = 'https://actai-redesign.pages.dev/';

export default defineNuxtConfig({
  // ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-gtag', '@pinia/nuxt'],
  gtag: {
    id: 'G-BDE6X04BMC',
  },
  runtimeConfig: {
    public: {
      baseUrl: BASE_URL,
      apiUrl: 'https://admin-procurement.actai.co',
    },
  },
  app: {
    head: {
      title: 'ACT Ai จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ และวิเคราะห์ความเสี่ยงไปกับ AI',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'ACT Ai จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ และวิเคราะห์ความเสี่ยงไปกับ AI',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: BASE_URL + 'ogimage.png',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image:src',
          content: BASE_URL + 'ogimage.png',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'ACT Ai จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ และวิเคราะห์ความเสี่ยงไปกับ AI',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },

        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: BASE_URL,
        },
      ],
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },
  // devServer: {
  //   host: '0.0.0.0',
  // },
  css: [
    '~/public/src/styles/main.scss', // you should add main.scss somewhere in your app
    '@wevisdemo/ui/styles/index.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/public/src/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['@headlessui/vue'],
  },
});
