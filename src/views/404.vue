<template>
  <not-found />
</template>

<script>
import NotFound from "@/components/NotFound.vue";

export default {
  components: { NotFound },

  mounted() {
    this.$title = this.$t("404View.tabTitle");
  },
};
</script>