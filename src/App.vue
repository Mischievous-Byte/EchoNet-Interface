<template>
    <header>
        <TopBar />
    </header> 
    <main>
        <AddressPanel />
        <Settings />
    </main>
</template>


<script setup lang="ts">
import TopBar from "./components/TopBar.vue"
import AddressPanel from './components/AddressPanel.vue'
import Settings from './components/Settings.vue'

</script>

<style>

main
{
    display: flex;
    position:relative;
    height: 100%;
    width:100%;
}

#app
{
    position:absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>