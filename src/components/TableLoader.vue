<template>
  <content-loader :width="400" :height="150" :speed="2" primaryColor="#d9d8e4" secondaryColor="#ecebeb">
    <circle cx="10" cy="20" r="6" />
    <rect x="25" y="17" rx="2" ry="5" width="220" height="4" />
    <circle cx="10" cy="40" r="6" />
    <rect x="25" y="37" rx="2" ry="5" width="220" height="4" />
    <circle cx="10" cy="60" r="6" />
    <rect x="25" y="57" rx="2" ry="5" width="220" height="4" />
    <circle cx="10" cy="80" r="6" />
    <rect x="25" y="77" rx="2" ry="5" width="220" height="4" />
  </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: { ContentLoader },
};
</script>

<style>
</style>