<template>
  <div class="address-panel">
    
    
    <span>Current node: </span>
    <select v-model="currentSelection">
      <option v-for="node in nodes">
        {{ node }}
      </option>
    </select>
    
    <button @click="directConnect()">Add Connection</button>
    <button>Get from Bridge</button>

  </div>
    
</template>



<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useConnectionStore } from "../stores/connection";
  import { defineModel } from "vue"

  const currentSelection = defineModel<string>("");

  const currentConnection = useConnectionStore();

  watch(currentSelection, () => {
    const node = currentSelection.value || "";

    currentConnection.url = node;
  });

  //All entries must be verified before being entered
  const nodes = ref<string[]>([]);

  const directConnect = () => {
    const address = (prompt("Enter address [ip:port]") || "").trim();
    
    if(nodes.value.includes(address))
    {
      alert(address + " is already in the list of nodes");
      return;
    }

    validate(address).then(b => {
      if(b)
        nodes.value.push(address);
      else
        alert("Couldn't connect to " + address);
    });
  }

  const validate = async (address : string) : boolean  => {

    const controller = new AbortController()

    const timeoutId = setTimeout(() => controller.abort(), 2000)

    let result = null;
    try
    {
      result = await fetch("http://" + address, { signal: controller.signal });
    } catch(e)
    {
      return false;
    }

    console.log(result);

    return result.status == 200;
  };
</script>


<style scoped>

.address-panel
{
  display: flex;
  align-items: center; 
  justify-content: left;
  gap: 10px; /* This will add 100px space between each child element */
  margin-bottom: 10px;
  padding-bottom: 3px;
  padding-top: 3px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: white;
}

select
{
  min-width:200px;
}
</style>