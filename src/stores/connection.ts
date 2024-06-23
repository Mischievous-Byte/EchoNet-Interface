import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', () => {
    let url : string = "";
    //const isValid = computed(() => )
    return { url };
});