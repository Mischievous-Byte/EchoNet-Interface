<template>
    <!--<header>
        <AddressPanel ref="panel" />
    </header>
    <main>
        <Container>
            <div title="Hello">Hello world!</div>
            <div title="World">World hello!</div>
            <div title="Hi">Hi universe!</div>
            <div title="Universe">Universe hi!</div>
        </Container>
    </main>
    <footer>

    </footer>-->
    <main>
        <AddressPanel />
        <Settings />
    </main>
</template>


<script setup lang="ts">
import AddressPanel from './components/AddressPanel.vue'
import Settings from './components/Settings.vue'
import Container from './components/Container.vue'

</script>

<style scoped>

</style>