<template>
  <ClientOnly fallback-tag="span" fallback="Loading...">
    <div
      class="flex flex-col-mbd items-center justify-end max-w-7xl mx-auto mt-3 gap-2"
    >
      <button
        v-for="(item, i) in activeMenuList"
        :class="[
          menuIndex == 0
            ? '!bg-white hover:!bg-[#DADADA] !text-black !w-full first'
            : '',
          menuIndex == menu.length - 1 ? '!w-full last' : '',
          menuIndex != 0 && i == 0 ? 'left' : '',
          menuIndex != menu.length - 1 && i == 1 ? 'right' : '',
          'navi-btn b1',
        ]"
        @click="$emit('menu', item)"
      >
        <!-- <template v-if="item"></template> -->
        <ChevronLeftIcon class="size-4 chevron-l" />
        <span class="truncate"> {{ item }}</span>
        <ChevronRightIcon class="size-4 chevron-r" />
      </button></div
  ></ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  section: string;
  activemenu: string;
  menuList: string[];
}>();

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

const menuIndex = ref(0);

let menu = [];

const activeMenuList = computed(() => {
  let activemenu = [];
  const index = menu.indexOf(props.activemenu);

  menuIndex.value = index;

  if (index == 0) activemenu.push(menu[1]);
  else if (index == menu.length - 1) activemenu.push(menu[menu.length - 2]);
  else {
    activemenu.push(menu[index - 1]);
    activemenu.push(menu[index + 1]);
  }

  return activemenu;
});

onBeforeMount(() => {
  // if (props.section == 'project') menu = projectMenu;
  // else if (props.section == 'gov') menu = govMenu;
  // else menu = contracterMenu;

  menu = props.menuList;
});
</script>

<style lang="scss" scoped>
.navi-btn {
  @apply sm:max-w-[250px] w-2/4 rounded-full p-2.5 bg-white hover:bg-[#DADADA] flex justify-center items-center gap-2;
}

.first {
  @apply bg-white hover:bg-[#DADADA];
}

.navi-btn:first-child {
  @apply bg-[#333333] hover:bg-black text-white duration-300;
}

.first .chevron-l,
.left .chevron-r,
.right .chevron-l,
.last .chevron-r {
  @apply hidden;
}
</style>
