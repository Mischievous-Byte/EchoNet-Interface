<template>
  <div class="container">
    <span class="panel-descriptor">Connections</span>
    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/trash.css' rel='stylesheet'>
    
    <button class="default-button">Get nodes from bridge</button>
    <button @click="directConnect()" class="default-button">Manually add node</button>
    <!--
    <span>Manual</span>
    <div>
      <input type="text"></input>
      <button @click="directConnect()" class="default-button">Add</button>
    </div>-->
    <br />
    <span>List of available nodes:</span>
    <div class="node-list">
      <div v-for="node in nodes"  class="node-entry">
        <div>
          <input type="checkbox" @change="updateSelection(node, $event.target.checked);" />
          <span>{{ node }}</span>
        </div>
        <button class="delete"><i class="gg-trash"></i></button>
      </div>
    </div>

    <!--<span>Current node: </span>
    <select v-model="currentSelection">
      <option v-for="node in nodes">
        {{ node }}
      </option>
    </select>-->
    
    
  </div>
    
</template>



<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useConnectionStore } from "../stores/connection";
  import { defineModel } from "vue"

  import { useSelectionStore } from "../stores/selection"

  import { updateSettings, retrieveSettings, ping} from "../api"


  const nodes = ref<string[]>([]);

  const selectionStore = useSelectionStore();


  watch(nodes, () => { 
    for(let i = nodes.value.length - 1; i >= 0; i --)
    {
      const index = selectionStore.selection.indexOf(nodes.value[i]);
      if (index > -1) { // only splice array when item is found
        selectionStore.selection.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  });


  const updateSelection = (address : string, selected : boolean) => {
    if(selected)
    {
      if(!selectionStore.selection.includes(address))
      {
        selectionStore.selection.push(address);
      }
    } else
    {
      const index = selectionStore.selection.indexOf(address);
      if (index > -1) { // only splice array when item is found
        selectionStore.selection.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  //All entries must be verified before being entered
  

  const directConnect = () => {
    const address = (prompt("Enter the address of the node:\n(ip:port)") || "").trim();
    
    if(nodes.value.includes(address))
    {

      alert(address + " is already in the list of nodes");
      return;
    }

    ping(address).then(b => {
      if(b)
        nodes.value.push(address);
      else
        alert("Couldn't connect to " + address);
    });
  }

</script>


<style scoped>

.container
{
  --ggs: 0.8;
  --border-offset: 10px;
  display: flex;
  /*align-items: center;*/

  flex-direction: column;
  /*justify-content: left;*/
  gap: 10px; /* This will add 100px space between each child element */

  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: white;

  min-width:300px;

  padding-top: 10px;

  position:relative;
  height: 100%;
}

button
{
  width: max-content;
}

.node-list
{
  border-radius: 8px;
  min-height: 10px;
  background-color: var(--background-color-tint);
  overflow:hidden;
  width: calc(100% - var(--border-offset));
}


.node-entry
{
  padding-left: 3px;
  padding-right: 0px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}

.node-entry + .node-entry
{
  border-top-style: solid;
  border-top-color: white;
  border-top-width: 1px;
}

.node-entry div span
{
  margin-left:5px;
}

.delete
{
  border: none;
  color: white;
  background-color: #ff3333;
  transition-duration: 100ms;
}

.delete:hover
{
  transition-duration: 100ms;
  background-color: #a82d2d;

}
</style>