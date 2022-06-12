<template>
  <div class="max-w-sm mx-auto mt-4">
    <section class="xy-a-section">
      <div class="xy-a-section__hd">Three.js docs</div>
      <div class="xy-a-section-bd">
        <ul role="list" class="mt-10 space-y-4">
          <li v-for="item in threeDocsMenuList" :key="item.id">
            <ListItem
              :link="{
                id: item.id,
                title: item.title,
                url: item.url,
              }"
            />
          </li>
        </ul>
      </div>
    </section>
    <!-- <ul role="list" class="mt-10 space-y-4">
      <li v-for="item in lists" :key="item.id">
        <ListItem
          :link="{
            id: item.id,
            title: item.title,
            url: item.url,
          }"
        />
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
import { NuxtLink } from "#components";
import { link } from "~/types";
export default {
  components: {
    NuxtLink,
  },
  setup() {
    const threeDocsMenuList = ref<link[]>([
      { id: 1, title: "create-a-scene", url: "/three-docs/create-a-scene" },
      { id: 2, title: "create-a-line", url: "/three-docs/create-a-line" },
      { id: 3, title: "create-text", url: "/three-docs/create-text" }
    ]);

    const lists = ref<link[]>([
      { id: 1, title: "Pinia Store", url: "pinia" },
      { id: 1, title: "Modal", url: "modal" },
      { id: 1, title: "Menu", url: "menu" },
      { id: 1, title: "New soon...", url: "" },
    ]);
    return {
      lists,
      threeDocsMenuList
    };
  },
};
</script>
