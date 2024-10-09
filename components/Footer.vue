<template>
  <div class="bg-black p-5 sm:p-10">
    <div class="max-w-6xl mx-auto">
      <div
        class="flex flex-col-mb sm:items-center sm:gap-5 pb-5 border-b border-[#7F7F7F]"
      >
        <div class="w-20">
          <img
            src="../public/src/images/act-logo.svg"
            alt="ACT Logo"
            class="w-[60px] sm:w-20"
          />
        </div>
        <div class="flex justify-between w-full mt-2 sm:mt-0">
          <div class="flex flex-col text-[#D9D9D9] b2 font-bold">
            <a href="/" target="_blank" rel="noopener noreferrer">หน้าหลัก</a>
            <a href="/learn" target="_blank" rel="noopener noreferrer"
              >เข้าใจการจัดซื้อจัดจ้าง</a
            >
            <a
              href="/term-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              >Term & Conditions</a
            >
          </div>
          <Contact />
        </div>
      </div>
      <p class="b1 text-[#BCBCBC] mt-2.5">
        © องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
