<template>
  <div class="flex">
    <div class="w-[30%] bg-white p-5">test</div>
    <div class="w-[70%] p-5 bg-slate-300">
      <div class="w- bg-yellow-300 h-[300px] relative">
        <div class="flex h-full gap-2 items-end">
          <div
            class="flex-1 bg-red-600 h-2/4 relative pointer-events-none"
            v-for="item in 10"
          >
            <div
              class="absolute -bottom-4 text-white left-0 right-0 text-center"
            >
              1111
            </div>
          </div>
        </div>
        <div class="yaxis absolute inset-0 flex flex-col w-fullddd">
          <div
            v-for="item in 10"
            class="border-b w-full flex-1 border-black relative"
          >
            <span
              class="absolute -left-2 top-0 -translate-y-2/4 -translate-x-full text-right"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
