<template>
    <div class="container">
        <div class="buttons">
            <button :disabled="disabled" @click="retrieve()">Retrieve Settings</button>
            <button :disabled="disabled" @click="update()">Update Settings</button>
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

const volumeInput = ref();
const discoveryIntervalInput = ref();

const connectionStore = useConnectionStore();


const disabled = computed(() => connectionStore.url === "");

let controller = null;// = new AbortController();

const retrieve = () => {

    if(controller != null)
        controller.abort();

    if(disabled.value)
        return;
    
    controller = new AbortController();
    fetch("http://" + connectionStore.url + "/settings", {signal: controller.signal})
    .then(r => r.json())
    .then(json => {
        

        console.debug(json);

        volumeInput.value.value = json.volume * 100;
        discoveryIntervalInput.value.value = json.discovery_interval;
    });
}

const update = () => {
    if(controller != null)
        controller.abort();

    if(disabled.value)
        return;

    controller = new AbortController();

    const options = {
        signal: controller.signal,
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            volume: volumeInput.value.value / 100,
            discovery_interval: Number(discoveryIntervalInput.value.value)
        })
    }

    console.debug(options);

    fetch("http://" + connectionStore.url + "/settings",  options);
}


</script>

<style scoped>
.container
{
    margin-top: 20px;
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