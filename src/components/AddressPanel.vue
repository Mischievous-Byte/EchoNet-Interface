<template>
  <!--<select>
    <option value="http">HTTP</option>
    <option value="https">HTTPS</option>
  </select>-->
    <input type="text" placeholder="address" v-model="address" />
    <input type="number" placeholder="port" v-model="port"/>
    <button @click="validate">></button>
</template>



<script setup lang="ts">
  import { ref } from "vue";
  import { useConnectionStore } from "../stores/connection";
  
  //const emit = defineEmits(["valid-url"]);
  const address = ref("");
  const port = ref(0);

  const validate = () => {
    const base = address.value + ":" + port.value.toString();
    useConnectionStore().url = base;
  };

  //defineExpose({ invalidate });
</script>


<style scoped>

</style>