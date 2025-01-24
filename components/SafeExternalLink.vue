<script lang="ts" setup>
const props = defineProps<{
  href: string;
  linkClass?: string;
}>();

const isLinkValid = ref(false);

onBeforeMount(async () => {
  const res = await fetch(props.href, {
    method: 'HEAD',
  });

  isLinkValid.value = res.ok;
});
</script>

<template>
  <a
    v-if="isLinkValid"
    :href
    target="_blank"
    rel="noopener noreferrer"
    :class="linkClass"
    ><slot :isLinkValid
  /></a>
  <div v-else>
    <slot :isLinkValid />
  </div>
</template>
