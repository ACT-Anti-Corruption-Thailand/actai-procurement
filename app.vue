<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <WvCookieConsent
      policyUrl="/cookie-policy"
      :cookieOptions="cookieOptions"
    />
  </div>
</template>

<script setup>
import '@wevisdemo/ui/styles/cookie-consent.css';
import WvCookieConsent from '@wevisdemo/ui/vue/cookie-consent';

const cookieOptions = ['Performance'];

onMounted(() => {
  setTimeout(() => {
    const link_text_div = document.querySelector('.wv_cookie-consent__body a');

    if (link_text_div != null)
      link_text_div.innerHTML = 'นโยบายข้อมูลส่วนบุคคลสำหรับการใช้คุกกี้';
  }, 50);
});

function onCookieAccept(option) {
  if (option['Performance']) {
    // Initialize or enable analytics
  }
}
</script>
