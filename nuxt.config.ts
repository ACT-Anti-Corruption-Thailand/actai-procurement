// https://nuxt.com/docs/api/configuration/nuxt-config
const BASE_URL = 'https://www.google.com/';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: BASE_URL + 'og_' + process.env.NUXT_LOGO + '.png',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image:src',
          content: BASE_URL + 'og_' + process.env.NUXT_LOGO + '.png',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'จับโกงงบจัดซื้อจัดจ้างภาครัฐ',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน',
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
  css: [
    '~/public/src/styles/main.scss', // you should add main.scss somewhere in your app
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
});
