<script setup>
const config = useRuntimeConfig();
const route = useRoute();

defineProps({
  color: String,
  text: String,
});

const urlLink = ref('');

function copyURL() {
  let url = config.public.baseUrl;

  if (window.location.pathname != '/')
    url += window.location.pathname.replace('/', '');

  urlLink.value = url;

  navigator.clipboard.writeText(url).then(function () {
    var tooltip = document.getElementById('myTooltip');
    tooltip.innerHTML = 'คัดลอกแล้ว';
  });
}

function outFunc() {
  var tooltip = document.getElementById('myTooltip');
  tooltip.innerHTML = 'กดเพื่อคัดลอก';
}

function setURL() {
  let url = config.public.baseUrl;

  if (typeof window !== 'undefined') {
    if (window.location.pathname != '/')
      url += window.location.pathname.replace('/', '');
    if (window.location.search != '') url += window.location.search;

    return url;
  }
}
</script>

<template>
  <div class="flex w-fit items-center">
    <p :class="`b4 mr-2 text-[${color}]`">{{ text }}</p>
    <div class="flex gap-[5px] justify-center">
      <div class="relative tooltip">
        <span class="tooltiptext" id="myTooltip">กดเพื่อคัดลอก</span>
        <Copy
          :color="color"
          @click="copyURL()"
          class="cursor-pointer"
          @mouseleave="outFunc()"
        />
      </div>

      <ClientOnly fallback-tag="span" fallback="Loading...">
        <a
          target="_blank"
          :href="`http://www.facebook.com/sharer/sharer.php?u=${setURL()}`"
        >
          <Facebook :color="color" />
        </a>

        <a target="_blank" :href="`https://x.com/intent/tweet?url=${setURL()}`">
          <X :color="color" />
        </a>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.tooltip .tooltiptext {
  visibility: hidden;
  width: 80px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 130%;
  left: -90%;
  right: 0;
  margin: auto;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
