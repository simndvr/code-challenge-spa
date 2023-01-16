<script setup>
import Navbar from "./components/Navbar/Navbar.vue"
import Footer from "./components/Footer/Footer.vue"
</script>

<template>
  <main class="text-center bg-slate-900 text-white main-content position-relative max-height-vh-100 h-100">
    <Navbar />
    <RouterView />
    <Footer />
  </main>
</template>

<style></style>
