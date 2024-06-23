import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selection', () => {
    const selection = ref<string[]>([]);
    //const isValid = computed(() => )
    return { selection };
});