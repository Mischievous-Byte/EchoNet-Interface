import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', () => {
    const url = ref("");
    //const isValid = computed(() => )
    return { url };
});