<template>
  <div class="flex flex-wrap justify-between items-center bg-black p-3">
    <div>
      <a href="/">
        <img
          src="../public/src/images/act-logo.svg"
          alt="ACT Logo"
          class="mx-auto w-14"
      /></a>
    </div>
    <div class="order-1 md:order-0 w-full mt-3 md:mt-0 max-w-xl">
      <Search />
    </div>
    <div class="flex items-center gap-2 order-0 lg:order-1">
      <a href="/learn">
        <p class="b1 text-[#D9D9D9]">เข้าใจการจัดซื้อจัดจ้าง</p>
      </a>
      <a
        href="https://line.me/R/ti/p/@206vpscc"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="flex bg-[#5B0000] p-3 rounded-10 gap-2 text-white">
          <img src="/src/images/report.svg" alt="" class="w-5" />
          <p class="b1 hidden sm:block">แจ้งเหตุสงสัยทุจริต</p>
        </div></a
      >
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
