<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            as="template"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[90vw] max-w-[650px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <img
                src="../public/src/images/close.svg"
                alt="close"
                class="absolute right-5 top-5 cursor-pointer"
                @click="$emit('close')"
              />
              <SearchTutorial
                v-if="title == 'อ่านคำแนะนำและข้อจำกัดของเครื่องมือค้นหา'"
              />
              <HowToCheckRiskProject
                v-else-if="title == 'ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?'"
              />
              <MeaningOfType
                v-else-if="
                  title == 'วิธีการจัดหา มีอะไรบ้าง ลักษณะเป็นอย่างไร?'
                "
              />
              <MeaningOfChart v-else-if="title == 'กราฟนี้บ่งบอกอะไร'" />
              <MeaningOfChart2 v-else-if="title == 'กราฟนี้บ่งบอกอะไร 2'" />
              <MeaningOfNumber v-else-if="title == 'ตัวเลขนี้บ่งบอกอะไร'" />

              <div v-else-if="title == 'ผู้รับจ้างที่ได้งาน'">
                <p class="font-bold b1">ผู้รับจ้างที่ได้งาน</p>
                <p class="b2">
                  สามารถมีได้มากกว่า 1 ราย ถ้าโครงการมีหลายสัญญาจ้าง/รายการย่อย
                </p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const props = defineProps<{
  title: string;
}>();

const isOpen = ref(true);
</script>
