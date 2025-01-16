<script setup>
import { ref, computed } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';

const config = useRuntimeConfig();
const router = useRouter();
const searchList = ref([]);

let selected = ref();
let query = ref('');

const getSearchList = async (keyword) => {
  query.value = keyword;

  const res = await fetch(
    `${config.public.apiUrl}/search/keyword?text=${keyword}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    searchList.value = data.suggestKeywords;
  }
};

onMounted(() => {
  if (window.location.pathname == '/result') {
    const kw = decodeURI(window.location.href).split('=')[1];
    selected.value = kw.replace('/+/g', ' ');
    query.value = kw.replace('/+/g', ' ');
  }
});

const onEnterSearch = () => {
  if (query.value != null) {
    window.location.href = 'result?search=' + selected.value;
  }
};
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="Loading...">
    <div class="w-full max-w-xl flex">
      <Combobox v-model="selected" nullable>
        <div class="w-full">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-l-lg bg-white text-left b2 ring-[#C2141B]"
          >
            <ComboboxInput
              placeholder="ค้นด้วยคำในชื่อโครงการ/เลขที่โครงการ/ชื่อหน่วยงาน/ชื่อผู้รับจ้าง/เลขทะเบียนนิติบุคคล"
              id="search-input"
              class="w-full border-none py-2 px-3 text-black focus:ring-[#C2141B] b2"
              @change="getSearchList($event.target.value)"
              @keyup.enter="onEnterSearch"
            />
            <img
              src="../public/src/images/close.svg"
              alt="close"
              class="absolute right-5 my-auto w-4 h-4 inset-y-0 cursor-pointer"
              @click="
                (e) => {
                  e.stopPropagation();
                  query = '';
                }
              "
              v-if="query != ''"
            />
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions
              v-if="query != ''"
              class="absolute z-50 mt-1 max-h-60 max-w-[85%] sm:max-w-xl w-full overflow-auto rounded-10 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ComboboxOption
                v-if="query"
                :value="query"
                v-slot="{ selected, active }"
              >
                <!-- <a :href="`/result?search=${query}`"> -->
                <li
                  class="relative cursor-default select-none py-2 px-2 text-left b2 italic"
                  :class="{
                    'bg-black text-white': active,
                    'text-black': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    ค้นหาด้วยคำว่า "{{ query }}"
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-black': !active }"
                  >
                  </span>
                </li>
                <!-- </a> -->
              </ComboboxOption>
              <ComboboxOption
                v-for="(person, i) in searchList"
                as="template"
                :key="i"
                :value="person"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 px-2 text-left b2"
                  :class="{
                    'bg-black text-white': active,
                    'text-black': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ person }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-black': !active }"
                  >
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
      <a
        :href="`/result?search=${query}`"
        :class="[selected == '' ? 'pointer-events-none' : '']"
        @click="setKeyword()"
      >
        <div class="h-11 w-11">
          <img
            src="/public/src/images/search.svg"
            alt=""
            class="bg-[#EC1C24] hover:bg-[#C2141B] p-3 rounded-r-lg cursor-pointer"
          /></div
      ></a>
    </div>
  </ClientOnly>
</template>
