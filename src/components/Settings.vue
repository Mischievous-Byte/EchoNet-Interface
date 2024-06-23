<template>
    <div class="container">
        <span class="panel-descriptor">Settings</span>
        <div class="buttons">
            <button class="default-button" :disabled="!canRetrieve" @click="retrieve()">Retrieve Settings</button>
            <button class="default-button" :disabled="!canUpdate" @click="update()">Update Settings</button>
        </div>
        <div class="settings">
            <div>
                <span>Volume</span><input :disabled="disabled" ref="volumeInput" type="range" min="0" max="100" value="30">
            </div>
            <div>
                <span>Discovery Interval</span><input :disabled="disabled" ref="discoveryIntervalInput" type="number" min="0" value="2000">
            </div>
            
        </div>
        
    </div>
    
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useConnectionStore } from "@/stores/connection";
import { useSelectionStore } from "@/stores/selection";
import { updateSettings, retrieveSettings } from "../api"


const volumeInput = ref();
const discoveryIntervalInput = ref();

const connectionStore = useConnectionStore();
const selectionStore = useSelectionStore();

const canRetrieve = computed(() => selectionStore.selection.length == 1);

const canUpdate = computed(() => selectionStore.selection.length > 0);

const retrieve = async () => {
    if(!canRetrieve.value)
        return;
    
    const address = selectionStore.selection[0];
    try
    {
        const json = await retrieveSettings(address);

        volumeInput.value.value = json.volume * 100;
        discoveryIntervalInput.value.value = json.discovery_interval;
    } catch(e)
    {
        alert("Failed to retrieve settings from " + address);
    }
}

const update = () => {
    if(!canUpdate.value)
        return;

    const settings = {
        volume: volumeInput.value.value / 100,
        discovery_interval: Number(discoveryIntervalInput.value.value)
    };

    for(let i = 0; i < selectionStore.selection.length; i ++)
    {
        updateSettings(selectionStore.selection[i], settings);
    }
}


</script>

<style scoped>
.container
{
    padding-top:10px;
    margin-left: 20px;
    display: flex;
    gap: 10px;

  flex-direction: column;
}

.buttons
{
    width: max-content;
    border-bottom-color: white;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    padding-bottom: 3px;
}

.settings
{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: max-content;
}

.settings div
{
    display: flex;
    justify-content: space-between;
}

.settings input
{
    margin-left: 20px;

}
button + button
{
    margin-left: 25px;
}


</style>