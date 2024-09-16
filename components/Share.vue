<script setup>
const config = useRuntimeConfig();

function copyURL() {
  let url = config.public.baseUrl;

  navigator.clipboard.writeText(url).then(
    function () {
      console.log('Copied!');
    },
    function () {
      console.log('Copy error');
    }
  );
}
</script>

<template>
  <div class="flex justify-center items-center">
    <p class="b4 mr-2">แชร์</p>
    <div class="flex gap-[5px] justify-center">
      <img
        class="cursor-pointer"
        src="../public/src/images/copy-share.svg"
        alt="copy"
        @click="copyURL()"
      />

      <ShareNetwork
        network="facebook"
        url="https://actai-redesign.pages.dev/"
        title=""
      >
        <img src="../public/src/images/facebook.svg" alt="facebook" />
      </ShareNetwork>

      <ShareNetwork
        network="twitter"
        url="https://actai-redesign.pages.dev/"
        title=""
      >
        <img src="../public/src/images/x.svg" alt="x" />
      </ShareNetwork>
    </div>
  </div>
</template>
