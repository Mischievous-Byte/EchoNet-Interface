<template>
    <div>
        <div ref="sidebar">
            <ul>
                <li v-for="page in pages" >
                    <button @click="() => show(page)">{{ page.title }}</button>
                </li>
            </ul>
        </div>
        <div ref="container">
            <slot></slot>
        </div>
        
    </div>
</template>
  
  
  
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import TabLink from "./TabLink.vue";
    import type { Ref } from "vue";

    const container : Ref<any> = ref(null);
    const sidebar : Ref<any> = ref(null);

    const pages : Ref<any[]> = ref([]);

    const show = (page : any) => {
        pages.value.forEach((p) => p.element.style.display = "none");
        page.element.style.display = "";
    }
    onMounted(() => {
        
        for(let i = 0; i < container.value.children.length; i ++)
        {
            const child : HTMLElement = container.value.children[i];

            const title : string = child.getAttribute("title")?.toString() ?? "Untitled child " + i.toString();
            
            child.style.display = "none";
            pages.value.push({title:title, element:child});
        }

        pages.value[0].element.style.display = "";
    });
</script>

  
<style scoped>

</style>