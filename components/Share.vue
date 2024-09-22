<script setup>
const config = useRuntimeConfig();

defineProps({
  color: String,
  text: String,
});

function copyURL() {
  let url = config.public.baseUrl;

  if (window.location.pathname != '/')
    url += window.location.pathname.replace('/', '');
  if (window.location.search != '') url += window.location.search;

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
  <div class="flex w-fit items-center">
    <p :class="`b4 mr-2 text-[${color}]`">{{ text }}</p>
    <div class="flex gap-[5px] justify-center">
      <Copy :color="color" @click="copyURL()" class="cursor-pointer" />

      <ShareNetwork
        network="facebook"
        url="https://actai-redesign.pages.dev/"
        title=""
      >
        <Facebook :color="color" />
      </ShareNetwork>

      <ShareNetwork
        network="twitter"
        url="https://actai-redesign.pages.dev/"
        title=""
      >
        <X :color="color" />
      </ShareNetwork>
    </div>
  </div>
</template>
