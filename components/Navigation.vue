<template>
  <ClientOnly fallback-tag="span" fallback="Loading...">
    <div
      class="flex flex-col-mb items-center justify-end max-w-6xl mx-auto mt-3 gap-2"
    >
      <button
        v-for="item in activeMenuList"
        class="navi-btn b1"
        @click="$emit('menu', item)"
      >
        {{ item }}
      </button>
    </div></ClientOnly
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  section: string;
  activemenu: string;
}>();

const projectMenu = ['ภาพรวม', 'ข้อมูลเจาะลึก', 'เอกสารที่เกี่ยวข้อง'];
const govMenu = [
  'ภาพรวมโครงการที่จัดทำ',
  'รายชื่อโครงการที่จัดทำ',
  'ผู้รับจ้างที่ได้งาน',
];
const contracterMenu = [
  'ข้อมูลทั่วไป',
  'การรับงานกับหน่วยงานรัฐ',
  'ประวัติการทิ้งงาน',
  'ความสัมพันธ์',
  'กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน',
  'รายชื่อโครงการที่เกี่ยวข้อง',
  'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง',
];

let menu = [];

const activeMenuList = computed(() => {
  let activemenu = [];
  const index = menu.indexOf(props.activemenu);

  if (index == 0) activemenu.push(menu[1]);
  else if (index == menu.length - 1) activemenu.push(menu[menu.length - 2]);
  else {
    activemenu.push(menu[index - 1]);
    activemenu.push(menu[index + 1]);
  }

  //   console.log(activemenu);
  //   console.log(index, menu.length);

  return activemenu;
});

onBeforeMount(() => {
  if (props.section == 'project') menu = projectMenu;
  else if (props.section == 'gov') menu = govMenu;
  else menu = contracterMenu;
});
</script>

<style lang="scss" scoped>
.navi-btn {
  @apply sm:max-w-[250px] w-full rounded-full p-2.5;
}

.navi-btn:first-child {
  @apply bg-[#333333] text-white;
}

.navi-btn:last-child {
  @apply bg-white text-black;
}
</style>
