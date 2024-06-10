<template>
    <header>
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

    </footer>
</template>


<script setup lang="ts">
import AddressPanel from './components/AddressPanel.vue'
import Container from './components/Container.vue'

</script>



<style scoped>

</style>