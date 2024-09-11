<script setup></script>

<template>
  <div class="flex justify-center items-center">
    <p class="b4 mr-2">แชร์</p>
    <div class="flex gap-[5px] justify-center">
      <img src="../public/src/images/copy.svg" alt="copy" />

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
